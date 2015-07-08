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

    QUnit.test("CollectionSuffixCollectionNamingRule resolves parameters ending in the word 'Collection'.",(assert) => {
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

        assert.equal(instance.fooCollection.length, 2, "Successfully resolved class with all instances of dependency.");
    });

    QUnit.test("ArraySuffixCollectionNamingRule resolves parameters ending in the word 'Array'.",(assert) => {
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

        assert.equal(instance.fooArray.length, 2, "Successfully resolved class with all instances of dependency.");
    });
}

