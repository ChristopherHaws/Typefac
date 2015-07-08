module Typefac.Builder {
    export class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function) {
            this.component = new Typefac.Core.Registration.ComponentRegistration(type);
        }

        public component: Typefac.Core.Registration.ComponentRegistration;

        public as = (serviceName: string): IRegistrationBuilder => {
			var serviceNameLower = serviceName.toLowerCase();

			var matchedCollectionNamingRule = Typefac.Utilities.ArrayEx.firstOrDefault(Core.Configuration.collectionNamingRules,(rule) => {
				if (rule.isCollection(serviceNameLower)) {
					return true;
				}

				return false;
			});
			

			if (matchedCollectionNamingRule) {
				var ruleTypeName = Typefac.Utilities.ObjectEx.getClassName(matchedCollectionNamingRule);
				throw new Error(`Could not register '${serviceName}' because it matches the reserved collection naming rule '${ruleTypeName}'.`);
			}

			

            this.component.names.push(serviceName.toLowerCase());
            return this;
        }

        public instancePerDependency = (): IRegistrationBuilder => {
            this.component.sharing = Typefac.Core.InstanceSharing.None;
            return this;
        }

        public singleInstance = (): IRegistrationBuilder => {
            this.component.sharing = Typefac.Core.InstanceSharing.Shared;
            return this;
        }
    }
}