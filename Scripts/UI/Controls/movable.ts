namespace Zena.UI.Controls {
	export class Movable extends View {
		private _constrainFunc;

		static ClassName = {
			DRAGGING: "ux-dragging",
		}

		static Events = {
			BEFORE_MOVE: "beforemove",
			MOVE: "move",
			AFTER_MOVE: "aftermove"
		}

		constructor(parent?: View) {
			super(parent);
		}

		public unrender() {
			if (this.htmlNode()) {
				var owner = $(this.htmlNode());
				owner.off(this.makeEventKey(Events.MOUSE_DOWN));
			}
		}

		public constrain(value: Function) {
			this._constrainFunc = value;
			return this;
		}

		public onBeforeMove(callback: Function) {
			this.on(Movable.Events.BEFORE_MOVE, callback);
			return this;
		}

		public onMove(callback: Function) {
			this.on(Movable.Events.MOVE, callback);
			return this;
		}

		public onAfterMove(callback: Function) {
			this.on(Movable.Events.AFTER_MOVE, callback);
			return this;
		}

		public render(target: any) {
			var owner = $(target);			
			this.htmlNode(owner[0]);
			var that = this;
			var param = new EventParam();

			owner
				.on(this.makeEventKey(Events.MOUSE_DOWN), function (e) {
					if (e.which != MouseButton.LEFT) return;

					param.event(e);
					param.canceled(false);
					that.invoke(Movable.Events.BEFORE_MOVE, param);										
					if (param.canceled()) return;

					e.preventDefault();
					e.stopPropagation();

					var startX = e.clientX;
					var startY = e.clientY;
					var left = owner.position().left;
					var top = owner.position().top;
					var dragging = false;

					$(window).on(that.makeEventKey(Events.MOUSE_MOVE), function (e) {
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

					$(window).on(that.makeEventKey(Events.MOUSE_UP), function (e) {
						if (e.which !== MouseButton.LEFT) return;
						$(window).off(that.makeEventKey(Events.MOUSE_MOVE));
						$(window).off(that.makeEventKey(Events.MOUSE_UP));
						owner.removeClass(Movable.ClassName.DRAGGING);
						dragging = false;
						param.event(e);
						param.canceled(false);
						that.invoke(Movable.Events.AFTER_MOVE, param);
					});

				})				
		}

	}
}