module Tests.Scoping {
    QUnit.test("When I register a component as InstancePerDependency", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .instancePerDependency();

        var container = builder.build();

        var instanceOne = container.resolve<Foo>("Foo");
        var instanceTwo = container.resolve<Foo>("Foo");

        assert.notEqual(instanceOne, instanceTwo, "Then I want a new instance of the component each time I call resolve");
        assert.ok(instanceOne instanceof Foo, "Then I want the component to be an instance of the registered type");
    });
	
    QUnit.test("When I register a component as InstancePerDependency with a dependency registered as SingleInstance",(assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        builder
            .registerType(Bar)
            .as("Bar")
            .instancePerDependency();

        var container = builder.build();

        var instanceOne = container.resolve<Bar>("Bar");
        var instanceTwo = container.resolve<Bar>("Bar");
        var fooInstance = container.resolve<Foo>("Foo");

        assert.notEqual(instanceOne, instanceTwo, "Then I want a new instance of the component each time I call resolve");
        assert.equal(instanceOne.foo, instanceTwo.foo, "Then I want the same instance of the dependent component each time I call resolve");
        assert.equal(instanceOne.foo, fooInstance, "Then I want the dependent component to be the same instance as a direct resolve");
        assert.ok(instanceOne instanceof Bar, "Then I want the component to be an instance of the registered type");
        assert.ok(instanceOne.foo instanceof Foo, "Then I want the dependent component to be an instance of the registered type");
    });

    QUnit.test("When I register a component as SingleInstance", (assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        var container = builder.build();

        var instanceOne = container.resolve<Foo>("Foo");
        var instanceTwo = container.resolve<Foo>("Foo");

        assert.equal(instanceOne, instanceTwo, "Then I want the same instance of the component each time I call resolve");
        assert.ok(instanceOne instanceof Foo, "Then I want the component to be an instance of the registered type");
    });

    QUnit.test("When I register a component as SingleInstance with a dependency registered as InstancePerDependency", (assert) => {
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

        var instanceOne = container.resolve<Bar>("Bar");
        var instanceTwo = container.resolve<Bar>("Bar");
        var fooInstance = container.resolve<Foo>("Foo");

        assert.equal(instanceOne, instanceTwo, "Then I want the same instance of the component each time I call resolve");
        assert.equal(instanceOne.foo, instanceTwo.foo, "Then I want the same instance of the dependent component each time I call resolve");
        assert.notEqual(instanceOne.foo, fooInstance, "Then I want the dependent component to be a different instance than a direct resolve");
        assert.ok(instanceOne instanceof Bar, "Then I want the component to be an instance of the registered type");
        assert.ok(instanceOne.foo instanceof Foo, "Then I want the dependent component to be an instance of the registered type");
    });
	
    QUnit.test("When I register a component as SingleInstance with a dependency registered as SingleInstance",(assert) => {
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

        var instanceOne = container.resolve<Bar>("Bar");
        var instanceTwo = container.resolve<Bar>("Bar");
        var fooInstance = container.resolve<Foo>("Foo");

        assert.equal(instanceOne, instanceTwo, "Then I want the same instance of the component each time I call resolve");
        assert.equal(instanceOne.foo, instanceTwo.foo, "Then I want the same instance of the dependent component each time I call resolve");
        assert.equal(instanceOne.foo, fooInstance, "Then I want the dependent component to be the same instance as a direct resolve");
        assert.ok(instanceOne instanceof Bar, "Then I want the component to be an instance of the registered type");
        assert.ok(instanceOne.foo instanceof Foo, "Then I want the dependent component to be an instance of the registered type");
    });
}