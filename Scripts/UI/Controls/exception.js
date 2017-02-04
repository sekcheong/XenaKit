var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Controls;
        (function (Controls) {
            var Exception = (function () {
                function Exception(message, data) {
                    this._errorMsg = message;
                }
                Exception.prototype.message = function () {
                    return this._errorMsg;
                };
                Exception.prototype.data = function () {
                    return this._data;
                };
                return Exception;
            }());
            Controls.Exception = Exception;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=exception.js.map