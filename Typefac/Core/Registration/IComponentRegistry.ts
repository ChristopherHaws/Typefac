module Typefac.Core.Registration {
    export interface IComponentRegistry {
        register: (component: Typefac.Core.Registration.IComponentRegistration) => void;

        isRegistered: (name: string) => boolean;

        getRegistration(name: string): Typefac.Core.Registration.IComponentRegistration;

        getRegistrationOrNull(name: string): Typefac.Core.Registration.IComponentRegistration;

        getRegistrations(name: string): Typefac.Core.Registration.IComponentRegistration[];

        getRegistrationsOrNull(name: string): Typefac.Core.Registration.IComponentRegistration[];
    }
}