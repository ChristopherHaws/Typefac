/// <reference path="../utilities/array.ts" />
module Typefac.Core {
    import ArrayEx = Typefac.Utilities.ArrayEx;
    import ObjectEx = Typefac.Utilities.ObjectEx;

    export class Container implements IContainer {
        private functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;
        
        constructor() {
            this.componentRegistry = new Core.Registration.ComponentRegistry();
        }

        public componentRegistry: Registration.IComponentRegistry;

        public resolve = <T>(name: string): T => {
			var collectionNamingRule = Utilities.ArrayEx.firstOrDefault(Configuration.collectionNamingRules, (rule) => {
				if (rule.isCollection(name)) {
					return true;
				}
				
				return false;
			});
			
			if (collectionNamingRule) {
				name = collectionNamingRule.getName(name);
                return <T><Object>this.resolveMultiple(name);
            }
            
            return <T>this.resolveSingle(name);
        }
        
        public resolveSingle = <T>(name: string): T => {
            var component = this.componentRegistry.getRegistration(name);
            
            var object = this.resolveComponent(component);
                
            if (!object) {
                throw new Error(`Unable to find a component with a service named '${name}'.`);
            }

            return <T>object;
        }
        
        public resolveMultiple = <T>(name: string): T[] => {
            var components = this.componentRegistry.getRegistrations(name);
                
            if (components.length <= 0) {
                throw new Error(`Unable to find any components with a service named '${name}'.`);
            }

			return components.map((component) => {
				return <T>this.resolveComponent(component);
	        });
        }
        
        private resolveComponent = (component: Core.Registration.IComponentRegistration): Object => {
            if(component.sharing === InstanceSharing.Shared && component.instance) {
                return component.instance;
            }

            var serviceResolver = ArrayEx.lastOrDefault(Configuration.serviceResolvers, (resolver) => {
                return resolver.canResolve(component);
            });

            if (!serviceResolver) {
                throw new Error(`Could not find a service resolver that can resolve '${component.typeName}'.`);
            }

            var parameters = serviceResolver.getServiceNames(component);
            var dependancies = this.createDependancies(parameters);

			var boundClassDeclaration = Object.bind.apply(component.type, [null].concat(dependancies));
            var object = new boundClassDeclaration();
            
            if(component.sharing === InstanceSharing.Shared) {
                component.instance = object;
            }

            return object;
        }

        private createDependancies = (parameters: string[]): Array<any> => {
			return parameters.map((parameter) => {
				return <any>this.resolve(parameter);
			});
        }
    }
}