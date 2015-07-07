module Testing {
    export interface IFoo {
        type: string;
    }

    export class Foo implements IFoo {
        public randomNumber: number;
        public type = "Foo";

        constructor() {
            this.randomNumber = Math.random();
        }
    }

    export class Foo2 implements IFoo {
        public randomNumber: number;
        public type = "Foo2";

        constructor() {
            this.randomNumber = Math.random();
        }
    }

    export class Bar {
        public foo: Foo;

        constructor(foo: Foo) {
            if (!foo) {
                throw new Error("Foo cannot be null.");
            }

            this.foo = foo;
        }
    }

    export class BarWithMultipleFoos {
        public allFoos: IFoo[];

        constructor(allFoos: IFoo[]) {
            this.allFoos = allFoos;
        }
    }
}

QUnit.test("InstancePerDependency returns a new instance each resolve",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Testing.Foo)
        .as("Foo")
        .instancePerDependency();

    var container = builder.build();

    var instanceOne = container.resolve<Testing.Foo>("Foo");
    var instanceTwo = container.resolve<Testing.Foo>("Foo");

    assert.notEqual(instanceOne, instanceTwo, "Resolve returned different instances.");
});

QUnit.test("SingleInstance returns a the same instance each resolve",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Testing.Foo)
        .as("Foo")
        .singleInstance();

    var container = builder.build();

    var instanceOne = container.resolve<Testing.Foo>("Foo");
    var instanceTwo = container.resolve<Testing.Foo>("Foo");

    assert.equal(instanceOne, instanceTwo, "Resolve returned the same instances.");
});

QUnit.test("Last type registered gets resolved first",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Testing.Foo)
        .as("Foo")
        .instancePerDependency();

    builder
        .registerType(Testing.Foo2)
        .as("Foo")
        .instancePerDependency();

    var container = builder.build();

    var instance = container.resolve<Testing.IFoo>("Foo");

    assert.equal(instance.type, "Foo2", "Successfully resolved the last registered item.");
});

QUnit.test("Nested instances get resolved",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Testing.Foo)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Testing.Bar)
        .as("Bar")
        .singleInstance();

    var container = builder.build();

    var instance = container.resolve<Testing.Bar>("Bar");

    assert.ok(instance, "Resolve successfully returned an object.");
});

QUnit.test("SingleInstance resolves different dependancy then variable",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Testing.Foo)
        .as("Foo")
        .instancePerDependency();

    builder
        .registerType(Testing.Bar)
        .as("Bar")
        .singleInstance();

    var container = builder.build();

    var instanceOne = container.resolve<Testing.Bar>("Foo");
    var instanceTwo = container.resolve<Testing.Bar>("Bar");

    assert.notEqual(instanceOne, instanceTwo.foo, "Successfully returned different instances of the resolved object.");
});

QUnit.test("Class with parameter all...s resolves dependancy as an array",(assert) => {
    var builder = new Typefac.ContainerBuilder();

    builder
        .registerType(Testing.Foo)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Testing.Foo2)
        .as("Foo")
        .singleInstance();

    builder
        .registerType(Testing.BarWithMultipleFoos)
        .as("Bar")
        .singleInstance();

    var container = builder.build();

    var instance = container.resolve<Testing.BarWithMultipleFoos>("Bar");

    assert.equal(instance.allFoos.length, 2, "Successfully returned class with all instances of dependancy.");
});

