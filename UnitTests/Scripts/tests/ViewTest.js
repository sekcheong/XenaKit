QUnit.module("UI.Views.View()");

QUnit.test("Constructors", function (assert) {
	var view = new Zena.UI.Views.View();
	assert.ok((view != null), "null check");
});


//QUnit.module("UI.Views.View()");
//QUnit.test("Constructors", function (assert) {
//	var v = new Zena.UI.Views.View();
//	//console.log("ID",v.id);
//	//assert.ok((v.id != null) && (v.id.length > 0), "(v.id!=null) && (v.id.length>0)");
//	assert.ok((v != null), "null check");
//});