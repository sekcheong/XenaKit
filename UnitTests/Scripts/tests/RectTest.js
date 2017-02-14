QUnit.module("UI.Rect()");

QUnit.test("Constructors", function (assert) {
	var r = new Zena.UI.Rect();
	assert.ok((r != null), "null check");
});