namespace Zena.UI.Views {

	export class UIRect {

		private _origin: UIPoint;
		private _size: UISize;

		constructor()
		constructor(origin?: UIPoint | number, size?: UISize | number, width?: number, height?: number) {
			if (origin instanceof UIPoint && size instanceof UISize) {

			}
			else if (typeof origin == "number" && typeof size == "number" && typeof width == "number" && typeof height == "number") {

			}
			else {

			}
		}

		public get origin(): UIPoint {
			return this._origin;
		}

		public set origin(newValue: UIPoint) {
			if (newValue instanceof UIPoint) {
				this._origin = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}

		public get size(): UISize {
			return this._size;
		}

		public set size(newValue: UISize) {
			if (newValue instanceof UISize) {
				this._size = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}

	}
}