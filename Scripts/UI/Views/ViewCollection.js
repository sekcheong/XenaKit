var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Views;
        (function (Views) {
            /** The view collection*/
            var ViewCollection = (function () {
                function ViewCollection() {
                }
                ViewCollection.prototype.add = function (view) {
                    if (!this._viewList)
                        this._viewList = [];
                    if (view != null && view instanceof Views.View) {
                        this._viewList.push(view);
                    }
                    else {
                        throw new Error("Invalid type: " + view);
                    }
                };
                ViewCollection.prototype.addAll = function (first) {
                    var rest = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        rest[_i - 1] = arguments[_i];
                    }
                    this.add(first);
                    if (rest != null) {
                        for (var i = 0; i < rest.length; i++) {
                            this.add(rest[i]);
                        }
                    }
                };
                Object.defineProperty(ViewCollection.prototype, "length", {
                    get: function () {
                        if (this._viewList)
                            return this._viewList.length;
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewCollection.prototype.at = function (index) {
                    var r;
                    if (typeof index == "number") {
                        return this._viewList[index];
                    }
                    else {
                        var found;
                        this._viewList.forEach(function (item) {
                            if (item.id === index) {
                                found = item;
                                return;
                            }
                        });
                        return found;
                    }
                };
                ViewCollection.prototype.remove = function (index) {
                    var r;
                    if (typeof index == "number") {
                        var i = index;
                        var firstHalf = this._viewList.slice(0, i - 1);
                        var secondHalf = this._viewList.slice(i + 1, this._viewList.length - 1);
                        this._viewList = firstHalf.concat(secondHalf);
                        return this._viewList[index];
                    }
                    else {
                        var found = -1;
                        return null;
                    }
                };
                ViewCollection.prototype.forEach = function (callback, thisArg) {
                    this._viewList.forEach(callback, thisArg);
                };
                return ViewCollection;
            }());
            Views.ViewCollection = ViewCollection;
        })(Views = UI.Views || (UI.Views = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=ViewCollection.js.map