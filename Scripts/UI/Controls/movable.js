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
            var Movable = (function (_super) {
                __extends(Movable, _super);
                function Movable(parent) {
                    _super.call(this, parent);
                }
                Movable.prototype.unrender = function () {
                    if (this.htmlNode()) {
                        var owner = $(this.htmlNode());
                        owner.off(this.makeEventKey(Controls.Events.MOUSE_DOWN));
                    }
                };
                Movable.prototype.constrain = function (value) {
                    this._constrainFunc = value;
                    return this;
                };
                Movable.prototype.onBeforeMove = function (callback) {
                    this.on(Movable.Events.BEFORE_MOVE, callback);
                    return this;
                };
                Movable.prototype.onMove = function (callback) {
                    this.on(Movable.Events.MOVE, callback);
                    return this;
                };
                Movable.prototype.onAfterMove = function (callback) {
                    this.on(Movable.Events.AFTER_MOVE, callback);
                    return this;
                };
                Movable.prototype.render = function (target) {
                    var owner = $(target);
                    this.htmlNode(owner[0]);
                    var that = this;
                    var param = new Controls.EventParam();
                    owner
                        .on(this.makeEventKey(Controls.Events.MOUSE_DOWN), function (e) {
                        if (e.which != 1 /* LEFT */)
                            return;
                        param.event(e);
                        param.canceled(false);
                        that.invoke(Movable.Events.BEFORE_MOVE, param);
                        if (param.canceled())
                            return;
                        e.preventDefault();
                        e.stopPropagation();
                        var startX = e.clientX;
                        var startY = e.clientY;
                        var left = owner.position().left;
                        var top = owner.position().top;
                        var dragging = false;
                        $(window).on(that.makeEventKey(Controls.Events.MOUSE_MOVE), function (e) {
                            var newPos = {
                                top: top + (e.clientY - startY),
                                left: left + (e.clientX - startX)
                            };
                            if (!dragging) {
                                owner.addClass(Movable.ClassName.DRAGGING);
                                dragging = true;
                            }
                            param.data(newPos);
                            param.canceled(false);
                            param.event(e);
                            if (that._constrainFunc) {
                                var oldPos = { left: left, top: top };
                                newPos = that._constrainFunc(oldPos, newPos);
                            }
                            that.invoke(Movable.Events.MOVE, param);
                            owner.css(newPos);
                        });
                        $(window).on(that.makeEventKey(Controls.Events.MOUSE_UP), function (e) {
                            if (e.which !== 1 /* LEFT */)
                                return;
                            $(window).off(that.makeEventKey(Controls.Events.MOUSE_MOVE));
                            $(window).off(that.makeEventKey(Controls.Events.MOUSE_UP));
                            owner.removeClass(Movable.ClassName.DRAGGING);
                            dragging = false;
                            param.event(e);
                            param.canceled(false);
                            that.invoke(Movable.Events.AFTER_MOVE, param);
                        });
                    });
                };
                Movable.ClassName = {
                    DRAGGING: "ux-dragging",
                };
                Movable.Events = {
                    BEFORE_MOVE: "beforemove",
                    MOVE: "move",
                    AFTER_MOVE: "aftermove"
                };
                return Movable;
            }(Controls.View));
            Controls.Movable = Movable;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=movable.js.map