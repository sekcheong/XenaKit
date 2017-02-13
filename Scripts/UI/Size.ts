namespace Zena.UI {

	export class Size {
		private _width: number;
		private _height: number;

		constructor()
		constructor(width: number, height: number)
		constructor(width?: number, height?: number) {
			if (arguments.length == 2) {
				this.width = width;
				this.height = height;
			}
			else {
				this._width = 0;
				this._height = 0;
			}
		}

		public get width(): number {
			return this._width;
		}

		public set width(value: number) {			
			if (typeof value == "number") {
				this._width = value;
			}
			else {				
				throw new Error("Invalid parameter type: " + value);
			}
		}

		public get height(): number {
			return this._height;
		}

		public set height(value: number) {
			if (typeof value == "number") {
				this._height = value;
			}
			else {
				throw new Error("Invalid parameter type: " + value);
			}
		}
	}
} 