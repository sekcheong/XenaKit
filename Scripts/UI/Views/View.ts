namespace Zena.UI.Views {
	export abstract class View {
		private _id: string;
		private _frame: Rect;
		private _bounds: Rect;
		private _subViews: ViewCollection;

		abstract minSize(size: Size): Size;
		abstract maxSize(size: Size): Size;
		abstract preferredSize(size: Size): Size;
		abstract resizable(value: boolean): boolean;
		abstract visible(value: boolean): boolean;
		abstract disabled(value: boolean): boolean;
		abstract render(parent: View);

		/**
		* Get the sub-view collection.
		* @return {ViewCollection} A collection of sub-views.
		*/
		public get subViews(): ViewCollection {
			if (!this._subViews) {
				this._subViews = new ViewCollection();
			}
			return this._subViews;
		}

		/**
		* Get the unique id of the view.
		* @return {string} The unique id
		*/
		public get id(): string {
			if (!this._id) {
				this._id = Utils.getUID("V");
			}
			return this._id;
		}
	}
}