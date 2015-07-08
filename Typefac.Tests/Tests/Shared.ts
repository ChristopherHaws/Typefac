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