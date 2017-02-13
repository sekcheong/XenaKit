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

		public set width(newValue: number) {
			if (typeof newValue == "number") {
				this._width = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}


		public get height(): number {
			return this._height;
		}

		public set height(newValue: number) {
			if (typeof newValue == "number") {
				this._height = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}
	}
} 