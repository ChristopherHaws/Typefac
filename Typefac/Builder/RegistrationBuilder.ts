module Typefac.Builder {
    export class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function) {
            this.component = new Core.Registration.ComponentRegistration(type);
        }

        public component: Core.Registration.IComponentRegistration;

        public asSelf = (): IRegistrationBuilder => {
			var className = Utilities.ObjectEx.getClassName(this.component.type);

            return this.as(className);
        }

        public as = (serviceName: string): IRegistrationBuilder => {
			var serviceNameLower = serviceName.toLowerCase();

			var matchedCollectionNamingRule = Utilities.ArrayEx.firstOrDefault(Core.Configuration.collectionNamingRules,(rule) => {
				if (rule.isCollection(serviceNameLower)) {
					return true;
				}

				return false;
			});
			
			if (matchedCollectionNamingRule) {
				var ruleTypeName = Utilities.ObjectEx.getClassName(matchedCollectionNamingRule);
				throw new Error(`Could not register '${serviceName}' because it matches the reserved collection naming rule '${ruleTypeName}'.`);
            }

            if (this.component.names.indexOf(serviceNameLower) !== -1) {
				var className = Utilities.ObjectEx.getClassName(this.component.type);
				throw new Error(`Could not register '${className}' as '${serviceName}' because is has already been registered using that name.`);
            }
            
			this.component.names.push(serviceNameLower);
            return this;
        }

        public instancePerDependency = (): IRegistrationBuilder => {
            this.component.sharing = Core.InstanceSharing.None;
            return this;
        }

        public singleInstance = (): IRegistrationBuilder => {
            this.component.sharing = Core.InstanceSharing.Shared;
            return this;
        }
    }
}