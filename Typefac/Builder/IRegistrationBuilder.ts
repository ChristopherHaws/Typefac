module Typefac.Builder {
    export interface IRegistrationBuilder {
        Component: Typefac.Core.Registration.ComponentRegistration;

        As(name: string): IRegistrationBuilder;
        InstancePerDependency(): IRegistrationBuilder;
        SingleInstance(): IRegistrationBuilder;
    }
}