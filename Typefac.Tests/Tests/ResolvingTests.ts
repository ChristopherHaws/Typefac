module Tests.Resolving {
    QUnit.test("Last type registered gets resolved first", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .instancePerDependency();

        builder
            .registerType(Foo2)
            .as("Foo")
            .instancePerDependency();

        var container = builder.build();

        var instance = container.resolve<IFoo>("Foo");
        
        assert.ok(instance instanceof Foo2, "Successfully resolved the last registered item.");
    });

    QUnit.test("Nested instances get resolved", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        builder
            .registerType(Bar)
            .as("Bar")
            .singleInstance();

        builder
            .registerType(Bar2)
            .as("Bar2")
            .singleInstance();

        var container = builder.build();

        var instance = container.resolve<Bar2>("Bar2");

        assert.ok(instance, "Successfully resolved an object.");
        assert.ok(instance.bar, "Successfully resolved first child.");
        assert.ok(instance.bar.foo, "Successfully resolved second child.");
    });



    QUnit.test("Nested",(assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        var container = builder.build();
		
        assert.throws(
			() => { container.resolve<Bar2>("InvalidComponent"); },
			new Error("Could not find component 'InvalidComponent'.")
		);
    });
}