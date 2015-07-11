module Typefac.Builder {
    export interface IRegistrationBuilder {
        component: Core.Registration.IComponentRegistration;

        asSelf(): IRegistrationBuilder;
        as(name: string): IRegistrationBuilder;
        instancePerDependency(): IRegistrationBuilder;
        singleInstance(): IRegistrationBuilder;
    }
}