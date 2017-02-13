namespace Zena.UI.Views {

	/** The view collection*/
	export class ViewCollection {

		private _viewList: View[];

		public add(view: View) {
			if (!this._viewList) this._viewList = [];
			if (view != null && view instanceof View) {
				this._viewList.push(view);
			}
			else {
				throw new Error("Invalid type: " + view);
			}			
		}


		public addAll(first: View, ...rest: View[]) {
			this.add(first);
			if (rest != null) {
				for (let i = 0; i < rest.length; i++) {
					this.add(rest[i]);
				}
			}
		}


		public get length(): number {
			if (this._viewList) return this._viewList.length;
			return 0;
		}

		public at(index: number)
		public at(key: string)
		public at(index: number | string): View {
			var r: Rect;
			if (typeof index == "number") {
				return this._viewList[index];
			}
			else {
				var found: View;
				this._viewList.forEach(function (item) {
					if (item.id === index) {
						found = item;
						return;
					}
				});
				return found;
			}
		}


		public remove(index: number)
		public remove(key: string)
		public remove(index: number | string):View {
			var r: Rect;
			if (typeof index == "number") {
				let i = <number>index;
				let firstHalf = this._viewList.slice(0, i - 1);
				let secondHalf = this._viewList.slice(i + 1, this._viewList.length - 1);
				this._viewList=firstHalf.concat(secondHalf);
				return this._viewList[index];
			}
			else {
				var found: number = -1;		
				return null;
			}
		}

		public forEach(callback: (value: View, index: number, array: View[]) => void, thisArg?: any): void {
			this._viewList.forEach(callback, thisArg);
		}

	}
}