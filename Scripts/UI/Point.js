var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Point = (function () {
            function Point(left, top) {
                if (arguments.length == 2) {
                    this.left = left;
                    this.top = top;
                }
                else {
                    this.left = 0;
                    this.top = 0;
                }
            }
            Object.defineProperty(Point.prototype, "left", {
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
            Object.defineProperty(Point.prototype, "top", {
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
            return Point;
        }());
        UI.Point = Point;
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=Point.js.map