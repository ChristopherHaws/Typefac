module Typefac.Core {
    export interface IContainer {
        componentRegistry: Registration.IComponentRegistry;

        resolve<T>(name: string): T;

        resolveSingle<T>(name: string): T;

        resolveMultiple<T>(name: string): T[];
    }

    export class Container implements IContainer {
        private functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;
		private collectionNamingRules: Typefac.Core.Collections.ICollectionNamingRule[];
        
        constructor() {
			this.collectionNamingRules = [
				new Typefac.Core.Collections.ArraySuffixCollectionNamingRule(),
				new Typefac.Core.Collections.CollectionSuffixCollectionNamingRule()
			];
            this.componentRegistry = new Typefac.Core.Registration.ComponentRegistry();
        }

        public componentRegistry: Registration.IComponentRegistry;

        public resolve = <T>(name: string): T => {
            var lowerName = name.toLowerCase();
			
			var rule = Typefac.Utilities.ArrayEx.firstOrDefault(this.collectionNamingRules, (rule) => {
				if (rule.isCollection(lowerName)) {
					return true;
				}
				
				return false;
			});
			
			if (rule) {
				lowerName = rule.getName(lowerName);
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
            var components = this.componentRegistry.getRegistrationsOrNull(lowerName);
                
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
        
        private resolveComponent = (component: Typefac.Core.Registration.IComponentRegistration): Object => {
            if (!component) {
                return null;
            }
            
            if(component.sharing == InstanceSharing.Shared && component.instance) {
                return component.instance;
            }
            
            var parameters = this.getParameters(component);
            var dependancies = this.createDependancies(parameters);
			
			var boundClassDeclaration = Object.bind.apply(component.type, [null].concat(dependancies));
            var object = new boundClassDeclaration();
            
            if(component.sharing == InstanceSharing.Shared) {
                component.instance = object;
            }

            return object;
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