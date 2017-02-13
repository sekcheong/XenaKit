QUnit.module("UI.Views.ViewCollection()");
QUnit.test("Constructors", function (assert) {
	var c = new Zena.UI.Views.ViewCollection();
	assert.ok((c != null), "null check");
});