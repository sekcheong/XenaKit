var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        /** Class representing a rectangle. */
        var Rect = (function () {
            function Rect(origin, size, width, height) {
                if (origin instanceof UI.Point && size instanceof UI.Size) {
                    this._origin = origin;
                    this._size = size;
                }
                else if (typeof origin == "number" && typeof size == "number" && typeof width == "number" && typeof height == "number") {
                    this._origin = new UI.Point(origin, size);
                    this._size = new UI.Size(width, height);
                }
            }
            Object.defineProperty(Rect.prototype, "origin", {
                /**
                * Get or set the origin of a rectangle.
                */
                get: function () {
                    var v = null;
                    return this._origin;
                },
                set: function (value) {
                    if (value instanceof UI.Point) {
                        this._origin = value;
                    }
                    else {
                        throw new Error("Invalid parameter type: " + value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "size", {
                /**
                * Get or set the size of a rectangle.
                */
                get: function () {
                    return this._size;
                },
                set: function (value) {
                    if (value instanceof UI.Size) {
                        this._size = value;
                    }
                    else {
                        throw new Error("Invalid parameter type: " + value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            return Rect;
        }());
        UI.Rect = Rect;
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=Rect.js.map