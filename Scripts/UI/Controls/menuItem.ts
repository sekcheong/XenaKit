namespace Zena.UI.Controls {
	export class MenuItem extends ListItem {

		public render(target: any) {			
			var a = $("<a>");
			if (parent) a.appendTo($(target));
			this.htmlNode(a[0]);
			
			if (this.html()) {
				a.html(this.html());
			}
			else {
				a.text(this.text());
			}

			var that: MenuItem = this;
			a.attr("title", this.helpText())
				.on(Events.CLICK, function (e) {
					if (that.disabled()) return;
					e.preventDefault();
					e.stopPropagation();
					that.invokeAsync(Events.CLICK, new EventParam(that, that, e));
				});

			return this.htmlNode();
		}


		


		

	}
}