using System.Web;
using System.Web.Optimization;

namespace autocomplete
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/d3").Include(
						"~/Scripts/d3/d3.js"));

			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js",
						"~/Scripts/jquery.slimscroll.js"
						));

			bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
				"~/Scripts/knockout-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/controls")
				.Include("~/Scripts/UI/controls/util.js",
						 "~/Scripts/UI/controls/events.js",
						 "~/Scripts/UI/controls/classnames.js",
						 "~/Scripts/UI/controls/eventparam.js",
						 "~/Scripts/UI/controls/view.js",
						 "~/Scripts/UI/controls/exception.js",
						 "~/Scripts/UI/controls/listitem.js",
						 "~/Scripts/UI/controls/menuitem.js",
						 "~/Scripts/UI/controls/menu.js",
						 "~/Scripts/UI/controls/listviewitem.js",
						 "~/Scripts/UI/controls/listview.js",
						 "~/Scripts/UI/controls/container.js",
						 "~/Scripts/UI/controls/button.js",
						 "~/Scripts/UI/controls/inputbox.js",
						 "~/Scripts/UI/controls/scrollbar.js",
						 "~/Scripts/UI/controls/movable.js",
						 "~/Scripts/UI/knockout/components/koinputbox.js",
						 "~/Scripts/UI/knockout/koextension.js"
						 ));


			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
					  "~/Scripts/bootstrap.js",
					  "~/Scripts/respond.js"));

			bundles.Add(new ScriptBundle("~/bundles/main").Include(
					  "~/Scripts/app.js"));

			bundles.Add(new StyleBundle("~/Content/css").Include(
					  "~/Content/bootstrap.css",
					  "~/Content/site.css",
					  "~/Content/scss/themes/light/light.css"
					  ));
		}
	}
}
