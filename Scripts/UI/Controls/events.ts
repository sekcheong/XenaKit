namespace Zena.UI.Controls {

	export const enum KeyCode  {
		ESCAPE = 27,
		UP_ARROW = 38,
		DOWN_ARROW = 40,
		LEFT_ARROW = 37,
		RIGHT_ARROW = 39,
		SHIFT = 16,
		CONTROL = 17,
		ALT = 18,
		CAPS_LOCK = 20,
		COMMAND = 91,
		SPACE = 32,
		TAB = 9,
		ENTER = 13
	}

	export const enum MouseButton {
		LEFT = 1,
		MIDDLE = 2,
		RIGHT = 3
	}

	export const enum WheelDeltaMode {
		DOM_DELTA_PIXEL = 0x00, 	//The delta values are specified in pixels.
		DOM_DELTA_LINE = 0x01, 	    //The delta values are specified in lines.
		DOM_DELTA_PAGE = 0x02 	    //The delta values are specified in pages.
	}

	//event names shared by all components
	export const Events = {
		CLICK: "click",
		KEY_DOWN: "keydown",
		KEY_UP: "keyup",
		PASTE: "paste",
		CUT:"cut",
		RESIZE: "resize",
		FOCUS: "focus",
		BLUR: "blur",		
		MOUSE_ENTER: "mouseenter",
		MOUSE_LEAVE: "mouseleave",
		MOUSE_DOWN: "mousedown",
		MOUSE_UP: "mouseup",
		MOUSE_MOVE: "mousemove",		
		MOUSE_WHEEL: "mousewheel",
		WHEEL: "wheel",
		FORCE_CLOSE: "ux-force-close",		
	}
}