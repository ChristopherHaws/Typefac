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

        var container = builder.build();

        var instance = container.resolve<Bar>("Bar");

        assert.ok(instance, "Resolve successfully returned an object.");
    });
}