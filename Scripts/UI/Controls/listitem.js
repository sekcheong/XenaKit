var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Zena;
(function (Zena) {
    var UI;
    (function (UI) {
        var Controls;
        (function (Controls) {
            var ListItem = (function (_super) {
                __extends(ListItem, _super);
                function ListItem(text, helpText, data, key) {
                    _super.call(this);
                    this._text = text;
                    this._helpText = helpText;
                    this._data = data;
                    if (key != undefined) {
                        this.key(key);
                    }
                }
                ListItem.prototype.text = function (newTxt) {
                    if (arguments.length == 0) {
                        return this._text;
                    }
                    else {
                        this._text = newTxt;
                        var node = (this.htmlNode() ? $(this.htmlNode()) : null);
                        if (node)
                            node.text(this._text);
                    }
                };
                ListItem.prototype.helpText = function (newTxt) {
                    if (arguments.length == 0)
                        return this._helpText;
                    this._helpText = newTxt;
                };
                ListItem.prototype.html = function (newHtml) {
                    if (arguments.length == 0) {
                        return this._html;
                    }
                    else {
                        this._html = newHtml;
                        var node = this.htmlNode();
                        if (node)
                            $(node).html(this._html);
                    }
                };
                ListItem.prototype.unrender = function () {
                    this.parent(null);
                    if (!this.htmlNode())
                        return;
                    $(this.htmlNode()).remove();
                    this.htmlNode(null);
                };
                ListItem.prototype.destroy = function () {
                    this.unrender();
                };
                ListItem.prototype.render = function (target) {
                };
                ListItem.prototype.key = function (value) {
                    if (arguments.length == 0) {
                        if (this._key == null)
                            return this.uid();
                        return this._key;
                    }
                    if (value == null) {
                        throw new Controls.Exception("ListItem.key(): key value cannot be null or undefined.");
                    }
                    this._key = value;
                };
                ListItem.prototype.data = function (value) {
                    if (arguments.length == 0)
                        return this._data;
                    this._data = value;
                    return this;
                };
                ListItem.prototype.height = function (h) {
                    _super.prototype.height.call(this, h);
                    if (arguments.length == 0) {
                        if (this.htmlNode()) {
                            return $(this.htmlNode()).outerHeight();
                        }
                        else {
                            return _super.prototype.height.call(this);
                        }
                    }
                    if (this.htmlNode()) {
                        $(this.htmlNode()).css("height", h);
                    }
                    _super.prototype.height.call(this, h);
                    return this;
                };
                ListItem.prototype.selected = function (value) {
                    if (!this.htmlNode())
                        return false;
                    var a = $(this.htmlNode());
                    if (arguments.length == 0) {
                        return a.hasClass(Controls.ClassName.SELECTED);
                    }
                    if (value) {
                        a.addClass(Controls.ClassName.SELECTED);
                    }
                    else {
                        a.removeClass(Controls.ClassName.SELECTED);
                    }
                };
                return ListItem;
            }(Controls.View));
            Controls.ListItem = ListItem;
        })(Controls = UI.Controls || (UI.Controls = {}));
    })(UI = Zena.UI || (Zena.UI = {}));
})(Zena || (Zena = {}));
//# sourceMappingURL=listitem.js.map