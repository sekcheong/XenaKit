namespace Zena.UI {

	export class Rect {

		private _origin: Point;
		private _size: Size;

		constructor()
		constructor(left: number, top: number, width: number, height: number)
		constructor(origin: Point, size: Size)
		constructor(origin?: Point | number, size?: Size | number, width?: number, height?: number) {
			if (origin instanceof Point && size instanceof Size) {
				this._origin = origin;
				this._size = size;
			}
			else if (typeof origin == "number" && typeof size == "number" && typeof width == "number" && typeof height == "number") {
				this._origin = new Point(origin as number, size as number);
				this._size = new Size(width, height);
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