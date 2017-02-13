var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Views;
        (function (Views) {
            var View = (function () {
                function View() {
                }
                Object.defineProperty(View.prototype, "subViews", {
                    /**
                    * Get the sub-view collection.
                    * @return {ViewCollection} A collection of sub-views.
                    */
                    get: function () {
                        if (!this._subViews) {
                            this._subViews = new Views.ViewCollection();
                        }
                        return this._subViews;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(View.prototype, "id", {
                    /**
                    * Get the unique id of the view.
                    * @return {string} The unique id
                    */
                    get: function () {
                        if (!this._id) {
                            this._id = UI.Utils.getUID("V");
                        }
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                return View;
            }());
            Views.View = View;
        })(Views = UI.Views || (UI.Views = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=View.js.map