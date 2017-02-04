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
            var MenuItem = (function (_super) {
                __extends(MenuItem, _super);
                function MenuItem() {
                    _super.apply(this, arguments);
                }
                MenuItem.prototype.render = function (target) {
                    var a = $("<a>");
                    if (parent)
                        a.appendTo($(target));
                    this.htmlNode(a[0]);
                    if (this.html()) {
                        a.html(this.html());
                    }
                    else {
                        a.text(this.text());
                    }
                    var that = this;
                    a.attr("title", this.helpText())
                        .on(Controls.Events.CLICK, function (e) {
                        if (that.disabled())
                            return;
                        e.preventDefault();
                        e.stopPropagation();
                        that.invokeAsync(Controls.Events.CLICK, new Controls.EventParam(that, that, e));
                    });
                    return this.htmlNode();
                };
                return MenuItem;
            }(Controls.ListItem));
            Controls.MenuItem = MenuItem;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=menuitem.js.map