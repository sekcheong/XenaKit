var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
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
                set: function (value) {
                    if (typeof value === "number") {
                        this._width = value;
                    }
                    else {
                        throw new Error("Invalid parameter type: " + value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Size.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    if (typeof value == "number") {
                        this._height = value;
                    }
                    else {
                        throw new Error("Invalid parameter type: " + value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            return Size;
        }());
        UI.Size = Size;
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=Size.js.map