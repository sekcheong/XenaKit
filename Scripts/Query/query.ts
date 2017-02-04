namespace Zena.Query {
	export class Query {
		public createQuery() {
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
		}
	}

}