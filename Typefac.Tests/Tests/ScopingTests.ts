module Tests.Scoping {
    QUnit.test("InstancePerDependency returns a new instance each resolve", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .instancePerDependency();

        var container = builder.build();

        var instanceOne = container.resolve<Foo>("Foo");
        var instanceTwo = container.resolve<Foo>("Foo");

        assert.notEqual(instanceOne, instanceTwo, "Successfully resolved different instances.");
    });

    QUnit.test("SingleInstance returns a the same instance each resolve", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        var container = builder.build();

        var instanceOne = container.resolve<Foo>("Foo");
        var instanceTwo = container.resolve<Foo>("Foo");

        assert.equal(instanceOne, instanceTwo, "Successfully resolved the same instances.");
    });

    QUnit.test("SingleInstance resolves different dependency then variable", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .instancePerDependency();

        builder
            .registerType(Bar)
            .as("Bar")
            .singleInstance();

        var container = builder.build();

        var instanceOne = container.resolve<Bar>("Foo");
        var instanceTwo = container.resolve<Bar>("Bar");

        assert.notEqual(instanceOne, instanceTwo.foo, "Successfully returned different instances of the resolved object.");
    });
}