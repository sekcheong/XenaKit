QUnit.module("UI.Point()");

QUnit.test("Constructors", function (assert) {
	var p = new Zena.UI.Point();
	assert.ok((p != null), "null check");
	assert.equal(p.left, 0, "p.left == 0");
	assert.equal(p.top, 0, "p.left == 0");

	p = new Zena.UI.Point(100, 200);
	assert.ok((p != null), "null check");
	assert.equal(p.left, 100, "p.left == 100");
	assert.equal(p.top, 200, "p.left == 100");	
});


QUnit.test("Properties", function (assert) {
	var p = new Zena.UI.Point(150, 300);
	p.left = 150;
	p.top = 300;
	assert.equal(p.left, 150, "p.left == 150");
	assert.equal(p.top, 300, "p.left == 300");
});


QUnit.test("TypeCheck", function (assert) {
	var p = new Zena.UI.Point(150, 300);
	try {
		p.left = "150";
		assert.ok(false, "p.left: Exception not thrown!");
	}
	catch (ex) {
		assert.ok(true, "p.left: Exception thrown for attempting assign 'string' to 'number'.");
	}

	try {
		p.top = "150";
		assert.ok(false, "p.top: Exception not thrown!");
	}
	catch (ex) {
		assert.ok(true, "p.top: Exception thrown for attempting assign 'string' to 'number'.");
	}
});




