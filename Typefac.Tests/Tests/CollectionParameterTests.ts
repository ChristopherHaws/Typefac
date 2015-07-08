module Tests {
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
}

QUnit.test("CollectionSuffixCollectionNamingRule resolves parameters ending in the word 'Collection'.",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Tests.Foo2)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Tests.ClassWithCollectionParameter)
        .as("ClassWithCollectionParameter")
        .singleInstance();

    var container = builder.build();

    var instance = container.resolve<Tests.ClassWithCollectionParameter>("ClassWithCollectionParameter");

    assert.equal(instance.fooCollection.length, 2, "Successfully resolved class with all instances of dependancy.");
});

QUnit.test("ArraySuffixCollectionNamingRule resolves parameters ending in the word 'Array'.",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Tests.Foo2)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Tests.ClassWithArrayParameter)
        .as("ClassWithArrayParameter")
        .singleInstance();

    var container = builder.build();

    var instance = container.resolve<Tests.ClassWithArrayParameter>("ClassWithArrayParameter");

    assert.equal(instance.fooArray.length, 2, "Successfully resolved class with all instances of dependancy.");
});