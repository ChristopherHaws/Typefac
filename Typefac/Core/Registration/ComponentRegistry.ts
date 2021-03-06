﻿module Typefac.Core.Registration {
    export class ComponentRegistry implements Registration.IComponentRegistry {
        protected components: Registration.IComponentRegistration[];
        
        constructor() {
            this.components = [];
        }

        public register = (component: IComponentRegistration): void => {
            this.components.push(component);
        }

        public isRegistered = (name: string): boolean => {
            var component = this.getRegistrationOrNull(name);
            
            return (!!component);
        }

        public getRegistration = (name: string): IComponentRegistration => {
            var component = this.getRegistrationOrNull(name);

            if (!component) {
                throw new Error(`Could not find component '${name}'.`);
            }

            return component;
        }

        public getRegistrationOrNull = (name: string): IComponentRegistration => {
			return Utilities.ArrayEx.lastOrDefault(this.components, (component) => {
				if (component.names.indexOf(name.toLowerCase()) !== -1) {
                    return true;
                }

				return false;
			});
        }
        
        public getRegistrations = (name: string): IComponentRegistration[] => {
            var components = this.getRegistrationsOrNull(name);

            if (!components || components.length <= 0) {
                throw new Error(`Could not find component '${name}'.`);
            }

            return components;
        }

        public getRegistrationsOrNull = (name: string): IComponentRegistration[]=> {
			return this.components.filter((component) => {
				if (component.names.indexOf(name.toLowerCase()) !== -1) {
                    return true;
                }

				return false;
	        });
        }
    }
}