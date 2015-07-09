module Typefac.Builder {
    export interface IRegistrationBuilder {
        component: Typefac.Core.Registration.ComponentRegistration;

        asSelf(): IRegistrationBuilder;
        as(name: string): IRegistrationBuilder;
        instancePerDependency(): IRegistrationBuilder;
        singleInstance(): IRegistrationBuilder;
    }
}