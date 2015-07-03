module Typefac.Core.Registration {
    export class ComponentRegistry implements Typefac.Core.Registration.IComponentRegistry {
        private components: Typefac.Core.Registration.IComponentRegistration[];

        public Register(component: Typefac.Core.Registration.IComponentRegistration): void {
            this.components.push(component);
        }

        public IsRegistered(name: string): boolean {
            var component = this.GetRegistrationOrNull(name);
            
            return (!!component);
        }

        public GetRegistration(name: string): Typefac.Core.Registration.IComponentRegistration {
            var component = this.GetRegistrationOrNull(name);

            if (!component) {
                throw new Error(`Could not find component '${name}'.`);
            }

            return component;
        }

        public GetRegistrationOrNull(name: string): Typefac.Core.Registration.IComponentRegistration {
            for (var i = this.components.length; i >= 0; i--) {
                var component = this.components[i];

                if (component.Names.indexOf(name) === 1) {
                    return component;
                }
            }

            return null;
        }
        
        public GetRegistrations(name: string): Typefac.Core.Registration.IComponentRegistration[] {
            var components = this.GetRegistrationsOrNull(name);

            if (!components || components.length <= 0) {
                throw new Error(`Could not find component '${name}'.`);
            }

            return components;
        }

        public GetRegistrationsOrNull(name: string): Typefac.Core.Registration.IComponentRegistration[] {
            var registrations: Typefac.Core.Registration.IComponentRegistration[] = [];

            for (var i = this.components.length; i >= 0; i--) {
                var component = this.components[i];

                if (component.Names.indexOf(name) === 1) {
                    registrations.push(component);
                }
            }

            return registrations;
        }
    }
}