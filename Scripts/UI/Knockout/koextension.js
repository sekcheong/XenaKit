var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Knockout;
        (function (Knockout) {
            var ns = Zena.UI.Knockout.Components;
            var KnockoutExtension = (function () {
                function KnockoutExtension() {
                }
                KnockoutExtension.registerComponents = function () {
                    //put all the Knockout component registrations here
                    ns.KOInputBox.register();
                };
                return KnockoutExtension;
            }());
            Knockout.KnockoutExtension = KnockoutExtension;
        })(Knockout = UI.Knockout || (UI.Knockout = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=koextension.js.map