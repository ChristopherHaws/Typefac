module Typefac.Core.Registration {
    export interface IComponentRegistry {
        Register: (component: Typefac.Core.Registration.IComponentRegistration) => void;

        IsRegistered: (name: string) => boolean;

        GetRegistration(name: string): Typefac.Core.Registration.IComponentRegistration;

        GetRegistrationOrNull(name: string): Typefac.Core.Registration.IComponentRegistration;

        GetRegistrations(name: string): Typefac.Core.Registration.IComponentRegistration[];

        GetRegistrationsOrNull(name: string): Typefac.Core.Registration.IComponentRegistration[];
    }
}