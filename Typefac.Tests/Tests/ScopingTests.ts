module Tests {
    export interface IFoo {
        type: string;
    }

    export class Foo implements IFoo {
        public type = "Foo";
    }

    export class Foo2 implements IFoo {
        public type = "Foo2";
    }

    export class Bar {
        constructor(public foo: Foo) {
        }
    }
}

QUnit.test("InstancePerDependency returns a new instance each resolve",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .instancePerDependency();

    var container = builder.build();

    var instanceOne = container.resolve<Tests.Foo>("Foo");
    var instanceTwo = container.resolve<Tests.Foo>("Foo");

    assert.notEqual(instanceOne, instanceTwo, "Successfully resolved different instances.");
});

QUnit.test("SingleInstance returns a the same instance each resolve",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .singleInstance();

    var container = builder.build();

    var instanceOne = container.resolve<Tests.Foo>("Foo");
    var instanceTwo = container.resolve<Tests.Foo>("Foo");

    assert.equal(instanceOne, instanceTwo, "Successfully resolved the same instances.");
});

QUnit.test("SingleInstance resolves different dependancy then variable",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Tests.Foo)
        .as("Foo")
        .instancePerDependency();

    builder
        .registerType(Tests.Bar)
        .as("Bar")
        .singleInstance();

    var container = builder.build();

    var instanceOne = container.resolve<Tests.Bar>("Foo");
    var instanceTwo = container.resolve<Tests.Bar>("Bar");

    assert.notEqual(instanceOne, instanceTwo.foo, "Successfully returned different instances of the resolved object.");
});



