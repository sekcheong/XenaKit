var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Views;
        (function (Views) {
            var UIRect = (function () {
                function UIRect(origin, size, width, height) {
                    if (origin instanceof Views.UIPoint && size instanceof Views.UISize) {
                    }
                    else if (typeof origin == "number" && typeof size == "number" && typeof width == "number" && typeof height == "number") {
                    }
                    else {
                    }
                }
                Object.defineProperty(UIRect.prototype, "origin", {
                    get: function () {
                        return this._origin;
                    },
                    set: function (newValue) {
                        if (newValue instanceof Views.UIPoint) {
                            this._origin = newValue;
                        }
                        else {
                            throw new Error("Invalid parameter type: " + newValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIRect.prototype, "size", {
                    get: function () {
                        return this._size;
                    },
                    set: function (newValue) {
                        if (newValue instanceof Views.UISize) {
                            this._size = newValue;
                        }
                        else {
                            throw new Error("Invalid parameter type: " + newValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return UIRect;
            }());
            Views.UIRect = UIRect;
        })(Views = UI.Views || (UI.Views = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=UIRect.js.map