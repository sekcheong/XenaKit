var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Views;
        (function (Views) {
            var Size = (function () {
                function Size(width, height) {
                    if (arguments.length == 2) {
                        this.width = width;
                        this.height = height;
                    }
                    else {
                        this._width = 0;
                        this._height = 0;
                    }
                }
                Object.defineProperty(Size.prototype, "width", {
                    get: function () {
                        return this._width;
                    },
                    set: function (newValue) {
                        if (typeof newValue == "number") {
                            this._width = newValue;
                        }
                        else {
                            throw new Error("Invalid parameter type: " + newValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Size.prototype, "height", {
                    get: function () {
                        return this._height;
                    },
                    set: function (newValue) {
                        if (typeof newValue == "number") {
                            this._height = newValue;
                        }
                        else {
                            throw new Error("Invalid parameter type: " + newValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Size;
            }());
            Views.Size = Size;
        })(Views = UI.Views || (UI.Views = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=UISize.js.map