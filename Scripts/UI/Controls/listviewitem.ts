namespace Zena.UI.Controls {

	export class ListViewItem extends ListItem {

		private _checked: boolean;
		private _hasCheckbox: boolean;

		public hasCheckBox(value?: boolean) {
			if (typeof value === "boolean") {
				this._hasCheckbox = value;
			}
			else {
				throw new Exception("ListViewItem.hasCheckBox() Invalid parameter type");
			}
		}

		public checked(value?:boolean) {
			if (typeof value === "boolean") {
				this._checked = value;
			}
			else {
				throw new Exception("ListViewItem.checked() Invalid parameter type");
			}
		}

		public render(target: any) {
			//<label><input type="checkbox" id="cbox1" value="first_checkbox"> This is the first checkbox</label>=			
			
			if (this._hasCheckbox) {
				var l = $("<label>");
				l.css("padding", 3);
				l.css("vertical-align", "central");
				var c = $("<input id='" + this.uid() + "'type='checkbox' " + (this._checked ? "checked" : "") + ">")
				c.appendTo($(target));
				l.text(this.text());
				l.attr("for", this.uid());
				l.appendTo($(target));								
			}
			else {
				var a = $("<a>");
				a.appendTo($(target));
				this.htmlNode(a[0]);
				if (this.html()) {
					a.html(this.html());
				}
				else {
					a.text(this.text());
				}				
			}
			
			////this.htmlNode(a[0]);

			//if (this.html()) {
			//	a.html(this.html());
			//}
			//else {
			//	a.text(this.text());
			//}

			//var that: MenuItem = this;
			//a.attr("title", this.helpText())
			//	.on(Events.CLICK, function (e) {
			//		if (that.disabled()) return;
			//		e.preventDefault();
			//		e.stopPropagation();
			//		that.invokeAsync(Events.CLICK, new EventParam(that, that, e));
			//	});

			
		}
	}
}