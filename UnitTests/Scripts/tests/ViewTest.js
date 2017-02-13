QUnit.module("UI.Views.View()");
QUnit.test("Constructors", function (assert) {
	var v = new Zena.UI.Views.View();
	assert.ok((v != null), "null check");
});