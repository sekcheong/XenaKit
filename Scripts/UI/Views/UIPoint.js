var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Views;
        (function (Views) {
            var UIPoint = (function () {
                function UIPoint(left, top) {
                    if (arguments.length == 2) {
                        this.left = left;
                        this.top = top;
                    }
                    else {
                        this.left = 0;
                        this.top = 0;
                    }
                }
                Object.defineProperty(UIPoint.prototype, "left", {
                    get: function () {
                        return this._left;
                    },
                    set: function (newValue) {
                        if (typeof newValue == "number") {
                            this._left = newValue;
                        }
                        else {
                            throw new Error("Invalid parameter type: " + newValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIPoint.prototype, "top", {
                    get: function () {
                        return this._top;
                    },
                    set: function (newValue) {
                        if (typeof newValue == "number") {
                            this._top = newValue;
                        }
                        else {
                            throw new Error("Invalid parameter type: " + newValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return UIPoint;
            }());
            Views.UIPoint = UIPoint;
        })(Views = UI.Views || (UI.Views = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=UIPoint.js.map