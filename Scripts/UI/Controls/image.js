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
            var Image = (function (_super) {
                __extends(Image, _super);
                function Image() {
                    _super.apply(this, arguments);
                }
                return Image;
            }(Controls.View));
            Controls.Image = Image;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=image.js.map