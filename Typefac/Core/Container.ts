module Typefac.Core {
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
                return null;
            }

            return <T>object;
        }
        
        public resolveMultiple = <T>(name: string): T[] => {
            var components = this.componentRegistry.getRegistrations(name);
                
            if (components.length <= 0) {
                throw new Error(`Unable to find any components named '${name}'.`);
            }

			return components.map((component) => {
				return <T>this.resolveComponent(component);
	        });
        }
        
        private resolveComponent = (component: Core.Registration.IComponentRegistration): Object => {
            if(component.sharing === InstanceSharing.Shared && component.instance) {
                return component.instance;
            }
            
            var parameters = this.getParameters(component);
            var dependancies = this.createDependancies(parameters);

			var boundClassDeclaration = Object.bind.apply(component.type, [null].concat(dependancies));
            var object = new boundClassDeclaration();
            
            if(component.sharing === InstanceSharing.Shared) {
                component.instance = object;
            }

            return object;
        }
        
        private getParameters = (component: Core.Registration.IComponentRegistration): string[] => {
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
			return $.map(parameters, (parameter) => {
				if (!this.componentRegistry.isRegistered(parameter)) {
					return null;
				}

				return parameter;
			});
        }

        private createDependancies = (parameters: string[]): Array<any> => {
			return parameters.map((parameter) => {
				return <any>this.resolve(parameter);
			});
        }
    }
}