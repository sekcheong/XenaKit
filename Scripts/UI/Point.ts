namespace Zena.UI.Views {
	export class Point {
		private _left: number;
		private _top: number;

		constructor()
		constructor(left?: number, top?: number) {
			if (arguments.length == 2) {				
				this.left = left;
				this.top = top;				
			}
			else {
				this.left = 0;
				this.top = 0;
			}			
		}


		public get left(): number {
			return this._left;
		}


		public set left(newValue: number) {
			if (typeof newValue == "number") {
				this._left = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}


		public get top(): number {
			return this._top;
		}


		public set top(newValue: number) {
			if (typeof newValue == "number") {
				this._top = newValue;
			}
			else {
				throw new Error("Invalid parameter type: " + newValue);
			}
		}
	}
} 