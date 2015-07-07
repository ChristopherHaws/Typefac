module Typefac.Core {
    export interface IContainer {
        componentRegistry: Registration.IComponentRegistry;

        resolve<T>(name: string): T;

        resolveSingle<T>(name: string): T;

        resolveMultiple<T>(name: string): T[];
    }

    export class Container implements IContainer {
        private functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;
        
        constructor() {
            this.componentRegistry = new Typefac.Core.Registration.ComponentRegistry();
        }

        public componentRegistry: Registration.IComponentRegistry;

        public resolve = <T>(name: string): T => {
            var lowerName = name.toLowerCase();
            
            if(this.isParameterNameCollection(lowerName)) {
                return <T><Object>this.resolveMultiple(lowerName);
            }
            
            return <T>this.resolveSingle(lowerName);
        }
        
        public resolveSingle = <T>(name: string): T => {
            var lowerName = name.toLowerCase();
            var component = this.componentRegistry.getRegistrationOrNull(lowerName);
            
            var object = this.resolveComponent(component);
                
            if (!object) {
                return null;
            }

            return <T>object;
        }
        
        public resolveMultiple = <T>(name: string): T[] => {
            var lowerName = name.toLowerCase();
            var collectionParameterName = this.getCollectionParameterName(lowerName);
            var components = this.componentRegistry.getRegistrationsOrNull(collectionParameterName);
                
            if (!components || components.length <= 0) {
                return null;
            }
            
            var objects: T[] = [];
            
            for(var i = 0; i < components.length; i++){                
                var object = this.resolveComponent(components[i]);
    
                objects.push(<T>object);
            }
            
            return objects;
        }
        
        public resolveComponent = (component: Typefac.Core.Registration.IComponentRegistration): Object => {
            if (!component) {
                return null;
            }
            
            if(component.sharing == InstanceSharing.Shared && component.instance) {
                return component.instance;
            }
            
            var parameters = this.getParameters(component);
            var depenancies = this.createDependancies(parameters);
            var object = {};

            component.type.apply(object, depenancies);
            
            if(component.sharing == InstanceSharing.Shared) {
                component.instance = object;
            }

            return object;
        }
        
        private isParameterNameCollection = (name: string): boolean => {
            // Begins with all
            if(name.substr(0, 3) !== "all") {
                return false;
            }
            
            // Ends with s
            if(name.indexOf("s", name.length - 1) === -1) {
                return false;
            }
            
            return true;
        }
        
        private getCollectionParameterName = (name: string): string => {
            return name.substr(3, name.length-4);
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
                objects.push(this.resolve(parameter));
            }

            return objects;
        }
    }
}