var Zena;
(function (Zena) {
    var Query;
    (function (Query_1) {
        var Query = (function () {
            function Query() {
            }
            Query.prototype.createQuery = function () {
                var query;
                query.select("value")
                    .from("//^CPU//")
                    .where("time between now() and now(-1d)")
                    .groupby("HostName, AttrName, time(24h)")
                    .having("avg(value)>30");
                query.onSusses(function (param) {
                });
                query.onFail(function (param) {
                });
                query.execute();
            };
            return Query;
        }());
        Query_1.Query = Query;
    })(Query = Zena.Query || (Zena.Query = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=query.js.map