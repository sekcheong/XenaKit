var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Controls;
        (function (Controls) {
            var Scrollbar = (function (_super) {
                __extends(Scrollbar, _super);
                function Scrollbar() {
                    _super.call(this);
                    //default line hight 14px
                    this._lineHeight = 14;
                }
                /**
                 * Sets the line high value in pixel for the wheel event
                 * @param - the line height in pixel of a single scroll wheel step
                 *          this value is used when the wheel delta mode is DOM_DELTA_LINE
                 */
                Scrollbar.prototype.lineHeight = function (height) {
                    if (arguments.length == 0)
                        return this._lineHeight;
                    this._lineHeight = height;
                };
                /**
                 * Sets the scroll top of the scroll view
                 * @param top - scroll top in pixel=
                 */
                Scrollbar.prototype.scrollTop = function (viewTop) {
                    if (arguments.length == 0)
                        return this._parentHTML.scrollTop;
                    var that = this;
                    setTimeout(function () {
                        var thumbTop;
                        thumbTop = viewTop * that._railScrollHeightRatio;
                        viewTop = UI.Util.clamp(viewTop, 0, that._maxViewTop);
                        thumbTop = UI.Util.clamp(thumbTop, 0, that._maxThumbTop);
                        $(that._parentHTML).scrollTop(viewTop);
                        $(that._rail).css("top", viewTop);
                        $(that._thumb).css("top", thumbTop);
                    });
                };
                Scrollbar.prototype.handleMouseWheel = function (e) {
                    var oe = e.originalEvent;
                    var that = this;
                    var top;
                    e.preventDefault();
                    switch (oe.deltaMode) {
                        case 0 /* DOM_DELTA_PIXEL */:
                            top = this.scrollTop() + oe.deltaY;
                            this.scrollTop(top);
                            break;
                        case 1 /* DOM_DELTA_LINE */:
                            top = this.scrollTop() + ((oe.deltaY < 0) ? -this._lineHeight : this._lineHeight);
                            this.scrollTop(top);
                            break;
                        case 2 /* DOM_DELTA_PAGE */:
                            var viewPortHeight = $(this._parentHTML).innerHeight();
                            top = this.scrollTop() + ((oe.deltaY < 0) ? -viewPortHeight : viewPortHeight);
                            this.scrollTop(top);
                            break;
                    }
                };
                Scrollbar.prototype.captureScroll = function () {
                    var that = this;
                    $(window)
                        .on(this.makeEventKey(Controls.Events.WHEEL), function (e) {
                        that.handleMouseWheel(e);
                    });
                };
                Scrollbar.prototype.releaseScroll = function () {
                    $(window)
                        .off(this.makeEventKey(Controls.Events.WHEEL));
                };
                Scrollbar.prototype.showScrollbar = function () {
                    clearTimeout(this._hideScrollbarTimer);
                    if (this._scrolling)
                        return;
                    if (this._parentHTML.scrollHeight <= $(this._rail).innerHeight())
                        return;
                    this.captureScroll();
                    $(this._rail).show();
                    $(this._rail).fadeTo(150, 1);
                };
                Scrollbar.prototype.hideScrollbar = function () {
                    clearTimeout(this._hideScrollbarTimer);
                    if (this._scrolling)
                        return;
                    var that = this;
                    this._hideScrollbarTimer = setTimeout(function () {
                        that.releaseScroll();
                        $(that._rail).fadeTo(500, 0, function () {
                            //that.shrinkScrollbar();
                        });
                    }, 500);
                };
                Scrollbar.prototype.captureKeyboard = function () {
                    var that = this;
                    $(document)
                        .on(this.makeEventKey(Controls.Events.KEY_DOWN), function (e) {
                        var cancel;
                        switch (e.keyCode) {
                            case 38 /* UP_ARROW */:
                                that.scrollTop(that.scrollTop() - that._lineHeight);
                                cancel = true;
                                break;
                            case 40 /* DOWN_ARROW */:
                                that.scrollTop(that.scrollTop() + that._lineHeight);
                                e.stopPropagation();
                                e.preventDefault();
                                cancel = true;
                                break;
                        }
                        if (cancel) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    });
                };
                Scrollbar.prototype.releaseKeyboard = function () {
                    $(document).off(this.makeEventKey(Controls.Events.KEY_DOWN));
                };
                Scrollbar.prototype.expandScrollbar = function () {
                    clearTimeout(this._expandScrollbarTimer);
                    //if scrollbar already expanded do nothing
                    if (this._savedWidth > 0)
                        return;
                    var rail = $(this._rail);
                    if (!rail.is(":hover"))
                        return;
                    var that = this;
                    var thumb = $(that._thumb);
                    var parent = $(that._parentHTML);
                    this._expandScrollbarTimer = setTimeout(function () {
                        that._savedWidth = parseFloat(rail.css("width"));
                        rail.css("width", that._savedWidth * 1.5);
                        thumb.css("width", $(rail).innerWidth());
                        //if thumb has rounded border, adjust the thumb radius
                        var radius = parseFloat(thumb.css("border-top-right-radius"));
                        if (radius > 0) {
                            thumb.css("border-radius", thumb.outerWidth() / 2);
                        }
                        var left = parent.innerWidth() - parseFloat(rail.css("width"));
                        rail.animate({ left: left }, 0);
                    }, 0);
                };
                Scrollbar.prototype.shrinkScrollbar = function () {
                    clearTimeout(this._expandScrollbarTimer);
                    //if scrollbar has not been expanded do nothing
                    if (this._savedWidth == -1) {
                        console.log("out");
                        return;
                    }
                    var rail = $(this._rail);
                    var thumb = $(this._thumb);
                    var parent = $(this._parentHTML);
                    rail.css("width", this._savedWidth);
                    thumb.css("width", $(rail).innerWidth());
                    //if thumb has rounded border, adjust the thumb radius
                    var radius = parseFloat(thumb.css("border-top-right-radius"));
                    if (radius > 0) {
                        thumb.css("border-radius", thumb.outerWidth() / 2);
                    }
                    rail.css("left", parent.innerWidth() - this._savedWidth);
                    this._savedWidth = -1;
                };
                Scrollbar.prototype.setScrollBarPosition = function () {
                    var rail = $(this._rail);
                    var thumb = $(this._thumb);
                    var parent = $(this._parentHTML);
                    //computes the scroll height to viewport ratio
                    var svRatio = (parent[0].scrollHeight / parent.innerHeight());
                    var thumbHeight = rail.innerHeight() / svRatio;
                    //make sure that the thumb is not too small 
                    //that the user may have trouble grabbing it
                    if (thumbHeight < Scrollbar.MIN_THUMB_HEIGHT) {
                        thumbHeight = Scrollbar.MIN_THUMB_HEIGHT;
                    }
                    thumb
                        .css("height", thumbHeight)
                        .css("width", rail.innerWidth())
                        .css("top", 0);
                    var railLeft = parent.innerWidth() - rail.outerWidth();
                    rail
                        .css("left", railLeft)
                        .css("top", 0)
                        .css("height", parent.innerHeight());
                    //compute the max thumb top position, this value will be used 
                    //in the constrain function of thumb's movable object to 
                    //limit the movement of the thumb to within the rail
                    this._maxThumbTop = rail.innerHeight() - thumb.outerHeight();
                    //compute the max. scroll top without the content being 
                    //scroll out of the viewport
                    this._maxViewTop = parent[0].scrollHeight - parent.innerHeight();
                    //if content is smaller or equal to the view height don't show 
                    //the scrollbar
                    if (this._maxViewTop < 0 || this._maxViewTop == 0) {
                        this._railScrollHeightRatio = Number.NaN;
                        rail.hide();
                    }
                    else {
                        this._railScrollHeightRatio = (rail.innerHeight() - thumb.outerHeight()) / this._maxViewTop;
                        rail.show();
                    }
                };
                Scrollbar.prototype.railHandleMouseDown = function (e) {
                    if (e.which != 1 /* LEFT */)
                        return;
                    var rail = $(this._rail);
                    var thumb = $(this._thumb);
                    var p = $(this._parentHTML);
                    var ratio = this._railScrollHeightRatio;
                    var that = this;
                    var top;
                    this._scrolling = true;
                    if (e.offsetY < parseInt(thumb.css("top")) - 3) {
                        that._autoScrollTimer = setInterval(function () {
                            var stop = !that._scrolling;
                            top = that.scrollTop() - that._lineHeight;
                            if (top * ratio <= e.offsetY) {
                                top = e.offsetY / ratio;
                                stop = true;
                            }
                            that.scrollTop(top);
                            if (stop)
                                clearInterval(that._autoScrollTimer);
                        }, 50);
                    }
                    else if (e.offsetY > parseInt(thumb.css("top") + parseInt(thumb.css("height")) + 3)) {
                        that._autoScrollTimer = setInterval(function () {
                            var stop = !that._scrolling;
                            top = that.scrollTop() + that._lineHeight;
                            if (top * ratio + thumb.outerHeight() >= e.offsetY) {
                                top = (e.offsetY - thumb.outerHeight()) / ratio;
                                stop = true;
                            }
                            that.scrollTop(top);
                            if (stop)
                                clearInterval(that._autoScrollTimer);
                        }, 50);
                    }
                    $(document)
                        .on(that.makeEventKey(Controls.Events.MOUSE_UP), function (e) {
                        if (e.which != 1 /* LEFT */)
                            return;
                        that._scrolling = false;
                        e.stopPropagation();
                        $(document).off(that.makeEventKey(Controls.Events.MOUSE_UP));
                    });
                };
                Scrollbar.prototype.render = function (element) {
                    var that = this;
                    var parent = $(element);
                    this._parentHTML = parent[0];
                    parent.css("overflow-y", "hidden");
                    var rail = $("<div>");
                    this._rail = rail[0];
                    this.htmlNode(rail[0]);
                    var thumb = $("<div>");
                    this._thumb = thumb[0];
                    //The scrollTop must be rest to 0 for this to work
                    //properly in FireFox. When page is refreshed FireFox
                    //somehow maintains the scroll position. If we attach
                    //the scrollbar to the element the scrollbar might be 
                    //position out of the view port. 
                    parent.scrollTop(0);
                    //setup event handler for the parent view
                    parent
                        .on(this.makeEventKey(Controls.Events.MOUSE_ENTER), function (e) {
                        that.showScrollbar();
                    })
                        .on(this.makeEventKey(Controls.Events.MOUSE_LEAVE), function (e) {
                        console.log("leave");
                        that.hideScrollbar();
                    })
                        .on(this.makeEventKey(Controls.Events.FOCUS), function (e) {
                        that.captureKeyboard();
                    })
                        .on(this.makeEventKey(Controls.Events.BLUR), function (e) {
                        that.releaseKeyboard();
                    });
                    rail
                        .addClass(Scrollbar.ClassName.SCROLLBAR)
                        .css("opacity", 0) //make it initially not visible
                        .css("position", "absolute")
                        .on(this.makeEventKey(Controls.Events.MOUSE_ENTER), function (e) {
                        that.expandScrollbar();
                    })
                        .on(this.makeEventKey(Controls.Events.MOUSE_LEAVE), function (e) {
                        if (!that._scrolling) {
                            console.log("shrink");
                            that.shrinkScrollbar();
                        }
                    })
                        .on(Controls.Events.MOUSE_DOWN, function (e) {
                        that.railHandleMouseDown(e);
                    });
                    rail.appendTo(parent);
                    thumb
                        .addClass(Scrollbar.ClassName.SCROLLBAR_THUMB)
                        .css("position", "absolute")
                        .appendTo(rail);
                    var movable = new Controls.Movable(this);
                    movable.render(thumb[0]);
                    movable
                        .constrain(function (oldPos, newPos) {
                        newPos.left = oldPos.left;
                        if (newPos.top < 0)
                            newPos.top = 0;
                        if (newPos.top > that._maxThumbTop)
                            newPos.top = that._maxThumbTop;
                        return newPos;
                    })
                        .onMove(function (e) {
                        var p = e.data();
                        setTimeout(function () {
                            var viewTop = p.top / that._railScrollHeightRatio;
                            parent.scrollTop(viewTop);
                            rail.css("top", parent.scrollTop());
                        });
                    })
                        .onBeforeMove(function (e) {
                        thumb.addClass(Scrollbar.ClassName.SCROLLBAR_ACTIVE);
                        that._scrolling = true;
                    })
                        .onAfterMove(function (e) {
                        //check to see if the mouse cursor is over the element
                        //hide the cursor if the cursor is out of the parent view
                        that._scrolling = false;
                        if (!parent.is(":hover")) {
                            that.hideScrollbar();
                        }
                        else {
                            //when scroll stops if the mouse is not on the thumb
                            //hide shrink the thumb. After scrolling by dragging 
                            //the thumb it is impossible that the mouse not on the
                            //thumb while remains on the rail. 
                            if (!$(that._thumb).is(":hover")) {
                                that.shrinkScrollbar();
                            }
                        }
                        thumb.removeClass(Scrollbar.ClassName.SCROLLBAR_ACTIVE);
                    });
                    this.setScrollBarPosition();
                };
                Scrollbar.MIN_THUMB_HEIGHT = 35;
                Scrollbar.ClassName = {
                    SCROLLBAR: "ux-scrollbar",
                    SCROLLBAR_THUMB: "ux-scrollbar-thumb",
                    SCROLLBAR_ACTIVE: "ux-scrollbar-thumb-active"
                };
                return Scrollbar;
            }(Controls.View));
            Controls.Scrollbar = Scrollbar;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=scrollbar.js.map