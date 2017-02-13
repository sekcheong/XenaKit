namespace Zena.UI {
	export class Utils {
		static MAX_UID = 10000000;

		static getUID(prefix?: string): string {
			if (!prefix) prefix = "";
			do {
				prefix += ~~(Math.random() * Util.MAX_UID)
			}
			while (document.getElementById(prefix))
			return prefix
		}
	}
}