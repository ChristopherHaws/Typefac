module Tests.Resolving {
    QUnit.test("When I resolve a component that has multiple components with the same name", (assert) => {
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
        
        assert.ok(instance instanceof Foo2, "Then I want to get the last registered component");
    });

    QUnit.test("When I resolve a component with multiple levels of dependencies", (assert) => {
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

        assert.ok(instance, "Then I want an instance of the component");
        assert.ok(instance.bar, "Then I want the first level dependency to be resolved");
        assert.ok(instance.bar.foo, "Then I want the second level dependency to be resolved");
    });
    
    QUnit.test("When I try to resolve a component that doesn't exist",(assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        var container = builder.build();
		
        assert.throws(
			() => { container.resolve<Bar2>("InvalidComponent"); },
			new Error("Could not find component 'InvalidComponent'."),
			"Then I want an error to be thrown letting me know that the component could not be found"
		);
    });

    QUnit.test("When I register a component as itself",(assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .asSelf()
            .singleInstance();

        var container = builder.build();

        var foo = container.resolve<Foo>("Foo");

        assert.ok(foo instanceof Foo, "Then I want to be able to resolve the component using the class name");
    });

    QUnit.test("When I register a component using the same name multiple times",(assert) => {
        var builder = new Typefac.ContainerBuilder();
        
        assert.throws(
			() => {
				builder
					.registerType(Foo)
					.asSelf()
					.as("Foo")
					.singleInstance();
			},
			new Error("Could not register 'Foo' as 'Foo' because is has already been registered using that name."),
			"Then I want an error to be thrown letting me know that the name has already been used"
		);
    });
}