
QUnit.test("Size - Constructors", function (assert) {
	var s = new Zena.UI.Size();
	assert.ok((s != null), "null check");
	assert.equal(s.width, 0, "s.width == 0");
	assert.equal(s.height, 0, "s.height == 0");

	s = new Zena.UI.Point(100, 200);
	assert.ok((s != null), "null check");
	assert.equal(s.left, 100, "s.width == 100");
	assert.equal(s.top, 200, "s.height == 200");
});


QUnit.test("Size - Properties", function (assert) {
	var s = new Zena.UI.Size(1501, 3100);

	assert.equal(s.width, 1501, "s.width == 1501");
	assert.equal(s.height, 3100, "s.height == 3100");

	s.width = 150;
	s.height = 300;
	assert.equal(s.width, 150, "s.width == 150");
	assert.equal(s.height, 300, "s.height == 300");
});


QUnit.test("Size - TypeCheck", function (assert) {
	var s = new Zena.UI.Size(150, 300);
	try {
		s.width = "123";
		assert.ok(false, "Exception not thrown!");
	}
	catch (ex) {
		assert.ok(true, "Exception thrown for attempting assign 'string' to 'number'.");
	}

	try {
		s.height = "banana";
		assert.ok(false, "Exception not thrown!");
	}
	catch (ex) {
		assert.ok(true, "Exception thrown for attempting assign 'string' to 'number'.");
	}
});