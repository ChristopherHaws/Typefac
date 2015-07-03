module Typefac.Core {
    export interface IContainer {
        ComponentRegistry: Registration.IComponentRegistry;

        ResolveComponent<T>(name: string): T;
    }

    export class Container implements IContainer {
        private functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;

        public ComponentRegistry: Registration.IComponentRegistry;

        public ResolveComponent<T>(name: string): T {
            var component = this.ComponentRegistry.GetRegistrationOrNull(name);

            if (!component) {
                return null;
            }
            
            var parameters = this.GetParameters(component);
            var depenancies = this.CreateDependancies(parameters);
            var object = {};

            component.Type.apply(object, depenancies);

            return <T>object;
        }

        private GetParameters(type: Typefac.Core.Registration.IComponentRegistration): string[] {
            if (!type.Names || type.Names.length <= 0) {
                return new Array<string>();
            }

            var result = type.Type.toString().match(this.functionArguments);
            if (result === null) {
                return new Array<string>();
            }

            if (result[1] === "") {
                return new Array<string>();
            }

            return new Array<string>(result[1]); 
        }

        private ResolveParameters(parameters: string[]) : string[] {
            var registeredDependancies = new Array<string>();

            for (var i = 0; i < parameters.length; i++) {
                var parameter = parameters[i];
                if (this.ComponentRegistry.IsRegistered(parameter)) {
                    registeredDependancies.push(parameter);
                }
            }

            return registeredDependancies;
        }

        private CreateDependancies(parameters: string[]): Array<any> {
            var objects = new Array<any>();

            for (var i = 0; i < parameters.length; i++) {
                var parameter = parameters[i];
                objects.push(this.ResolveComponent(parameter));
            }

            return objects;
        }
    }
}