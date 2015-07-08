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

    QUnit.test("When I have a parameter with the suffix 'Collection'.",(assert) => {
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

    QUnit.test("When I have a parameter with the suffix 'Array'.",(assert) => {
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
}

