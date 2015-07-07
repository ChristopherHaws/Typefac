module Typefac.Core.Registration {
    export class ComponentRegistry implements Typefac.Core.Registration.IComponentRegistry {
        private components: Typefac.Core.Registration.IComponentRegistration[];
        
        constructor() {
            this.components = [];
        }

        public register = (component: Typefac.Core.Registration.IComponentRegistration): void => {
            this.components.push(component);
        }

        public isRegistered = (name: string): boolean => {
            var component = this.getRegistrationOrNull(name);
            
            return (!!component);
        }

        public getRegistration = (name: string): Typefac.Core.Registration.IComponentRegistration => {
            var component = this.getRegistrationOrNull(name);

            if (!component) {
                throw new Error(`Could not find component '${name}'.`);
            }

            return component;
        }

        public getRegistrationOrNull = (name: string): Typefac.Core.Registration.IComponentRegistration => {
            for (var i = this.components.length-1; i >= 0; i--) {
                var component = this.components[i];
                
                if (component.names.indexOf(name) !== -1) {
                    return component;
                }
            }

            return null;
        }
        
        public getRegistrations = (name: string): Typefac.Core.Registration.IComponentRegistration[] => {
            var components = this.getRegistrationsOrNull(name);

            if (!components || components.length <= 0) {
                throw new Error(`Could not find component '${name}'.`);
            }

            return components;
        }

        public getRegistrationsOrNull = (name: string): Typefac.Core.Registration.IComponentRegistration[] => {
            var registrations: Typefac.Core.Registration.IComponentRegistration[] = [];

            for (var i = this.components.length; i >= 0; i--) {
                var component = this.components[i];

                if (component.names.indexOf(name) === 1) {
                    registrations.push(component);
                }
            }

            return registrations;
        }
    }
}