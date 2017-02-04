var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Controls;
        (function (Controls) {
            var ListViewItem = (function (_super) {
                __extends(ListViewItem, _super);
                function ListViewItem() {
                    _super.apply(this, arguments);
                }
                ListViewItem.prototype.hasCheckBox = function (value) {
                    if (typeof value === "boolean") {
                        this._hasCheckbox = value;
                    }
                    else {
                        throw new Controls.Exception("ListViewItem.hasCheckBox() Invalid parameter type");
                    }
                };
                ListViewItem.prototype.checked = function (value) {
                    if (typeof value === "boolean") {
                        this._checked = value;
                    }
                    else {
                        throw new Controls.Exception("ListViewItem.checked() Invalid parameter type");
                    }
                };
                ListViewItem.prototype.render = function (target) {
                    //<label><input type="checkbox" id="cbox1" value="first_checkbox"> This is the first checkbox</label>=			
                    if (this._hasCheckbox) {
                        var l = $("<label>");
                        l.css("padding", 3);
                        l.css("vertical-align", "central");
                        var c = $("<input id='" + this.uid() + "'type='checkbox' " + (this._checked ? "checked" : "") + ">");
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
                };
                return ListViewItem;
            }(Controls.ListItem));
            Controls.ListViewItem = ListViewItem;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=listviewitem.js.map