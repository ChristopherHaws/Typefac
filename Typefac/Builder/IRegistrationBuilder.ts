module Typefac.Builder {
    export interface IRegistrationBuilder {
        As(name: string): IRegistrationBuilder;
        InstancePerDependency(): IRegistrationBuilder;
        SingleInstance(): IRegistrationBuilder;
    }
}