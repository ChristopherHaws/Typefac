module Typefac.Core {
    export interface IContainer {
        componentRegistry: Registration.IComponentRegistry;

        resolveComponent<T>(name: string): T;
    }

    export class Container implements IContainer {
        private functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;
        
        constructor() {
            this.componentRegistry = new Typefac.Core.Registration.ComponentRegistry();
        }

        public componentRegistry: Registration.IComponentRegistry;

        public resolveComponent = <T>(name: string): T => {
            var component = this.componentRegistry.getRegistrationOrNull(name);

            if (!component) {
                return null;
            }
            
            var parameters = this.getParameters(component);
            var depenancies = this.createDependancies(parameters);
            var object = {};

            component.type.apply(object, depenancies);

            return <T>object;
        }

        private getParameters = (component: Typefac.Core.Registration.IComponentRegistration): string[] => {
            if (!component.names || component.names.length <= 0) {
                return new Array<string>();
            }

            var result = component.type.toString().match(this.functionArguments);
            if (result === null) {
                return new Array<string>();
            }

            if (result[1] === "") {
                return new Array<string>();
            }

            return new Array<string>(result[1]); 
        }

        private resolveParameters = (parameters: string[]) : string[] => {
            var registeredDependancies = new Array<string>();

            for (var i = 0; i < parameters.length; i++) {
                var parameter = parameters[i];
                if (this.componentRegistry.isRegistered(parameter)) {
                    registeredDependancies.push(parameter);
                }
            }

            return registeredDependancies;
        }

        private createDependancies = (parameters: string[]): Array<any> => {
            var objects = new Array<any>();

            for (var i = 0; i < parameters.length; i++) {
                var parameter = parameters[i];
                objects.push(this.resolveComponent(parameter));
            }

            return objects;
        }
    }
}