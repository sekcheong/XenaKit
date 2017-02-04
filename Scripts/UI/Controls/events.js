var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Controls;
        (function (Controls) {
            //event names shared by all components
            Controls.Events = {
                CLICK: "click",
                KEY_DOWN: "keydown",
                KEY_UP: "keyup",
                PASTE: "paste",
                CUT: "cut",
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
            };
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=events.js.map