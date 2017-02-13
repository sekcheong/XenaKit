var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.getUID = function (prefix) {
                if (!prefix)
                    prefix = "";
                do {
                    prefix += ~~(Math.random() * UI.Util.MAX_UID);
                } while (document.getElementById(prefix));
                return prefix;
            };
            Utils.MAX_UID = 10000000;
            return Utils;
        }());
        UI.Utils = Utils;
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=Utils.js.map