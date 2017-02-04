namespace Zena.UI.Controls {

	export class Scrollbar extends View {
		private _parentHTML: HTMLElement;
		private _rail: HTMLElement;
		private _thumb: HTMLElement;
		private _hideScrollbarTimer;
		private _autoScrollTimer;
		private _expandScrollbarTimer;
		private _lineHeight: number;
		private _maxThumbTop: number;
		private _maxViewTop: number;
		private _railScrollHeightRatio: number;
		private _savedWidth: number;
		private _hideScrollbar: boolean;
		private _scrolling: boolean;
		private _visible: boolean;

		static MIN_THUMB_HEIGHT = 35;

		static ClassName = {
			SCROLLBAR: "ux-scrollbar",
			SCROLLBAR_THUMB: "ux-scrollbar-thumb",
			SCROLLBAR_ACTIVE: "ux-scrollbar-thumb-active"
		}


		constructor() {
			super();
			//default line hight 14px
			this._lineHeight = 14;
		}

    	/**
		 * Sets the line high value in pixel for the wheel event
		 * @param - the line height in pixel of a single scroll wheel step
		 *          this value is used when the wheel delta mode is DOM_DELTA_LINE
		 */
		public lineHeight(height?: number) {
			if (arguments.length == 0) return this._lineHeight;
			this._lineHeight = height;
		}


		/**
		 * Sets the scroll top of the scroll view
		 * @param top - scroll top in pixel=		 
		 */
		public scrollTop(viewTop?: number) {
			if (arguments.length == 0) return this._parentHTML.scrollTop;

			var that = this;
			setTimeout(function () {
				var thumbTop;
				thumbTop = viewTop * that._railScrollHeightRatio;
				viewTop = Util.clamp(viewTop, 0, that._maxViewTop);
				thumbTop = Util.clamp(thumbTop, 0, that._maxThumbTop);
				$(that._parentHTML).scrollTop(viewTop);
				$(that._rail).css("top", viewTop);
				$(that._thumb).css("top", thumbTop);
			});
		}


		private handleMouseWheel(e) {
			var oe = e.originalEvent;
			var that = this;
			var top;
			e.preventDefault();

			switch (oe.deltaMode) {
				case WheelDeltaMode.DOM_DELTA_PIXEL:
					top = this.scrollTop() + oe.deltaY;
					this.scrollTop(top);
					break;

				case WheelDeltaMode.DOM_DELTA_LINE:
					top = this.scrollTop() + ((oe.deltaY < 0) ? -this._lineHeight : this._lineHeight);
					this.scrollTop(top);
					break;

				case WheelDeltaMode.DOM_DELTA_PAGE:
					var viewPortHeight = $(this._parentHTML).innerHeight();
					top = this.scrollTop() + ((oe.deltaY < 0) ? -viewPortHeight : viewPortHeight);
					this.scrollTop(top);
					break;
			}
		}


		private captureScroll() {
			var that = this;
			$(window)
				.on(this.makeEventKey(Events.WHEEL), function (e) {
					that.handleMouseWheel(e);
				});
		}


		private releaseScroll() {
			$(window)
				.off(this.makeEventKey(Events.WHEEL));
		}


		private showScrollbar() {
			clearTimeout(this._hideScrollbarTimer);
			if (this._scrolling) return;
			if (this._parentHTML.scrollHeight <= $(this._rail).innerHeight()) return;
			this.captureScroll();
			$(this._rail).show();
			$(this._rail).fadeTo(150, 1);
		}


		private hideScrollbar() {
			clearTimeout(this._hideScrollbarTimer);
			if (this._scrolling) return;
			var that = this;
			this._hideScrollbarTimer = setTimeout(function () {
				that.releaseScroll();
				$(that._rail).fadeTo(500, 0, function () {
					//that.shrinkScrollbar();
				});
				
			}, 500);

		}


		private captureKeyboard() {
			var that = this;
			$(document)
				.on(this.makeEventKey(Events.KEY_DOWN), function (e) {
					var cancel;
					switch (e.keyCode) {
						case KeyCode.UP_ARROW:
							that.scrollTop(that.scrollTop() - that._lineHeight);
							cancel = true;
							break;
						case KeyCode.DOWN_ARROW:
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
		}


		private releaseKeyboard() {
			$(document).off(this.makeEventKey(Events.KEY_DOWN));
		}


		private expandScrollbar() {
			clearTimeout(this._expandScrollbarTimer);

			//if scrollbar already expanded do nothing
			if (this._savedWidth > 0) return;		
			var rail = $(this._rail)
			if (!rail.is(":hover")) return;

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
		}


		private shrinkScrollbar() {
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
		}


		private setScrollBarPosition() {
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
		}


		private railHandleMouseDown(e) {

			if (e.which != MouseButton.LEFT) return;

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
					if (stop) clearInterval(that._autoScrollTimer);
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
					if (stop) clearInterval(that._autoScrollTimer);
				}, 50);
			}

			$(document)
				.on(that.makeEventKey(Events.MOUSE_UP), function (e) {
					if (e.which != MouseButton.LEFT) return;
					that._scrolling = false;
					e.stopPropagation();
					$(document).off(that.makeEventKey(Events.MOUSE_UP));
				});
		}


		public render(element: any) {
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
				.on(this.makeEventKey(Events.MOUSE_ENTER), function (e) {
					that.showScrollbar();
				})
				.on(this.makeEventKey(Events.MOUSE_LEAVE), function (e) {
					console.log("leave");
					that.hideScrollbar();
				})
				.on(this.makeEventKey(Events.FOCUS), function (e) {
					that.captureKeyboard();
				})
				.on(this.makeEventKey(Events.BLUR), function (e) {
					that.releaseKeyboard();
				});


			rail
				.addClass(Scrollbar.ClassName.SCROLLBAR)
				.css("opacity", 0)  //make it initially not visible
				.css("position", "absolute")
				.on(this.makeEventKey(Events.MOUSE_ENTER), function (e) {
					that.expandScrollbar();
				})
				.on(this.makeEventKey(Events.MOUSE_LEAVE), function (e) {
					if (!that._scrolling) {
						console.log("shrink");
						that.shrinkScrollbar();
					}
				})
				.on(Events.MOUSE_DOWN, function (e) {
					that.railHandleMouseDown(e);
				});
			rail.appendTo(parent);

			thumb
				.addClass(Scrollbar.ClassName.SCROLLBAR_THUMB)
				.css("position", "absolute")
				.appendTo(rail);

			var movable = new Movable(this);
			movable.render(thumb[0]);
			movable
				.constrain(function (oldPos: Position, newPos: Position) {
					newPos.left = oldPos.left;
					if (newPos.top < 0) newPos.top = 0;
					if (newPos.top > that._maxThumbTop) newPos.top = that._maxThumbTop;
					return newPos;
				})
				.onMove(function (e: EventParam) {
					var p: Position = e.data();
					setTimeout(function () {
						var viewTop = p.top / that._railScrollHeightRatio;
						parent.scrollTop(viewTop);
						rail.css("top", parent.scrollTop());
					});
				})
				.onBeforeMove(function (e: EventParam) {
					thumb.addClass(Scrollbar.ClassName.SCROLLBAR_ACTIVE);
					that._scrolling = true;
				})
				.onAfterMove(function (e: EventParam) {
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

		}
	}

}