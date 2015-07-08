module Tests.Collections {
    export class ClassWithCollectionParameter {
        public fooCollection: IFoo[];

        constructor(fooCollection: IFoo[]) {
            this.fooCollection = fooCollection;
        }
    }

    export class ClassWithArrayParameter {
        public fooArray: IFoo[];

        constructor(fooArray: IFoo[]) {
            this.fooArray = fooArray;
        }
    }

    QUnit.test("When I have a parameter with the suffix 'Collection'",(assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        builder
            .registerType(Foo2)
            .as("Foo")
            .singleInstance();

        builder
            .registerType(ClassWithCollectionParameter)
            .as("ClassWithCollectionParameter")
            .singleInstance();

        var container = builder.build();

        var instance = container.resolve<ClassWithCollectionParameter>("ClassWithCollectionParameter");

        assert.ok(Array.isArray(instance.fooCollection), "Then I want the parameter to be resolved as a collection");
        assert.equal(instance.fooCollection.length, 2, "Then I want the collection to contain all of the types registered as the parameter name without the suffix");
    });

	QUnit.test("When I try to register a component with a name that ends in 'Collection'",(assert) => {
        var builder = new Typefac.ContainerBuilder();
		
		assert.throws(
            () => { builder.registerType(Foo).as("FooCollection"); },
            new Error("Could not register 'FooCollection' because it matches the reserved collection naming rule 'CollectionSuffixCollectionNamingRule'."),
			"Then I want to receive an error letting me know that the name I chose matches a reserved collection naming rule"
		);
	});

    QUnit.test("When I have a parameter with the suffix 'Array'",(assert) => {
        var builder = new Typefac.ContainerBuilder();

        builder
            .registerType(Foo)
            .as("Foo")
            .singleInstance();

        builder
            .registerType(Foo2)
            .as("Foo")
            .singleInstance();

        builder
            .registerType(ClassWithArrayParameter)
            .as("ClassWithArrayParameter")
            .singleInstance();

        var container = builder.build();

        var instance = container.resolve<ClassWithArrayParameter>("ClassWithArrayParameter");

        assert.ok(Array.isArray(instance.fooArray), "Then I want the parameter to be resolved as a collection");
        assert.equal(instance.fooArray.length, 2, "Then I want the collection to contain all of the types registered as the parameter name without the suffix");
    });
	
	QUnit.test("When I try to register a component with a name that ends in 'Array'",(assert) => {
        var builder = new Typefac.ContainerBuilder();

		assert.throws(
			() => { builder.registerType(Foo).as("FooArray"); },
            new Error("Could not register 'FooArray' because it matches the reserved collection naming rule 'ArraySuffixCollectionNamingRule'."),
			"Then I want to receive an error letting me know that the name I chose matches a reserved collection naming rule"
			);
	});
}

