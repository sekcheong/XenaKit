namespace Zena.UI.Controls {
	export class EventParam {
		private _event: JQueryEventObject;
		private _data: any;
		private _context: any;
		private _canceled: boolean;
		private _failFunc: Function;
		private _doneFunc: Function;
		private _cancelFunc: Function;	

		constructor(data?: any, context?: any, event?: JQueryEventObject) {
			var that = this;
			this._event = event;
			this._data = data;
			this._context = context;
			this._canceled = false;						
		}	

		public context(value?: any) {
			if (arguments.length == 0) return this._context;
			this._context = value;
		}

		public data(value?: any): any {
			if (arguments.length == 0) {
				return this._data;
			}
			this._data = value;			
		}

		public event(value?): JQueryEventObject {
			if (arguments.length == 0) return this._event;
			this._event = value;
		}

		public done() {						
			Util.callAsync(this._doneFunc, this);
		}

		public cancel() {
			if (this._cancelFunc) {
				this._cancelFunc.call(this);
			}			
			this._canceled = true;			
		}

		public fail() {
			if (!this._failFunc) return;
			this._failFunc.call(this);
		}

		public onComplete(func: Function) {
			this._doneFunc = func;
		}

		public onCancel(func: Function) {
			this._cancelFunc = func;
		}

		public onFail(func: Function) {
			this._failFunc = func;
		}

		public canceled(value?: boolean): boolean {
			if (arguments.length == 0) return this._canceled;
			if (typeof value === "boolean") {
				this._canceled = value;
			}
			else {
				throw new Exception("EventParam.canceled(): invalid argument");
			}
		}
		
	}	
} 