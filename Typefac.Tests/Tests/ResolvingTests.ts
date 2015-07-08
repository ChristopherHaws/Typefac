QUnit.test("Last type registered gets resolved first",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .instancePerDependency();

    builder
        .registerType(Tests.Foo2)
        .as("Foo")
        .instancePerDependency();

    var container = builder.build();

    var instance = container.resolve<Tests.IFoo>("Foo");

    assert.equal(instance.type, "Foo2", "Successfully resolved the last registered item.");
    assert.ok(instance instanceof Tests.Foo2, "Successfully resolved the last registered item.");
});

QUnit.test("Nested instances get resolved",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Tests.Bar)
        .as("Bar")
        .singleInstance();

    var container = builder.build();

    var instance = container.resolve<Tests.Bar>("Bar");

    assert.ok(instance, "Resolve successfully returned an object.");
});