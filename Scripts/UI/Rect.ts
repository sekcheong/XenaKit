namespace Zena.UI {
	/** Class representing a rectangle. */
	export class Rect {

		private _origin: Point;
		private _size: Size;

		/**
		* Create an empty rectangle.
		*/
		constructor()

		/**
		* Create a rectangle with specified dimension.	
		* @param {number} left The left of the rectangle.
		* @param {number} top The top of the rectangle.
		* @param {number} width The width of the rectangle.
		* @param {number} height The height of the rectangle.
		*/
		constructor(left: number, top: number, width: number, height: number)

		/**
		* Create a rectangle with given origin and size.	
		* @param {Point} origin The origin of the rectangle.
		* @param {Size} size The size of the rectangle.
		*/
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

		/**
		* Get or set the origin of a rectangle.		
		*/
		public get origin(): Point {
			var v: UI.Views.View = null;						
			return this._origin;
		}

		public set origin(value: Point) {
			if (value instanceof Point) {
				this._origin = value;
			}
			else {
				throw new Error("Invalid parameter type: " + value);
			}
		}

		/**
		* Get or set the size of a rectangle.		
		*/
		public get size(): Size {
			return this._size;
		}
		
		public set size(value: Size) {
			if (value instanceof Size) {
				this._size = value;
			}
			else {
				throw new Error("Invalid parameter type: " + value);
			}
		}

	}
}