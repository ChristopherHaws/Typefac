module Typefac.Builder {
    export interface IRegistrationBuilder {
        component: Typefac.Core.Registration.ComponentRegistration;

        as(name: string): IRegistrationBuilder;
        instancePerDependency(): IRegistrationBuilder;
        singleInstance(): IRegistrationBuilder;
    }
}