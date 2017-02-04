namespace Zena.UI.Knockout {

	import ns = Zena.UI.Knockout.Components;

	export class KnockoutExtension {		
		public static registerComponents() {		
			//put all the Knockout component registrations here
			ns.KOInputBox.register();
		}
	}

}