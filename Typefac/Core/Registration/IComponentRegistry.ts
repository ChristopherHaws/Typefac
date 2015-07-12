module Typefac.Core.Registration {
    export interface IComponentRegistry {
        register: (component: Registration.IComponentRegistration) => void;

        isRegistered: (name: string) => boolean;

        getRegistration(name: string): Registration.IComponentRegistration;

        getRegistrationOrNull(name: string): Registration.IComponentRegistration;

        getRegistrations(name: string): Registration.IComponentRegistration[];

        getRegistrationsOrNull(name: string): Registration.IComponentRegistration[];
    }
}