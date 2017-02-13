namespace Zena.UI.Views {

	export class Rect {

		private _origin: Point;
		private _size: Size;

		constructor()
		constructor(origin?: Point | number, size?: Size | number, width?: number, height?: number) {
			if (origin instanceof Point && size instanceof Size) {

			}
			else if (typeof origin == "number" && typeof size == "number" && typeof width == "number" && typeof height == "number") {

			}
			else {

			}
		}

		public get origin(): Point {
			return this._origin;
		}

		public set origin(newValue: Point) {
			if (newValue instanceof Point) {
				this._origin = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}

		public get size(): Size {
			return this._size;
		}

		public set size(newValue: Size) {
			if (newValue instanceof Size) {
				this._size = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}

	}
}