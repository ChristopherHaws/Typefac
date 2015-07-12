/// <reference path="../utilities/array.ts" />
/// <reference path="../utilities/objectex.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../core/registration/componentregistration.ts" />
/// <reference path="../core/registration/icomponentregistration.ts" />
/// <reference path="../core/instancesharing.ts" />
/// <reference path="iregistrationbuilder.ts" />

module Typefac.Builder {
	import ArrayEx = Typefac.Utilities.ArrayEx;
	import ObjectEx = Typefac.Utilities.ObjectEx;
	import Configuration = Typefac.Core.Configuration;
	import ComponentRegistration = Typefac.Core.Registration.ComponentRegistration;
	import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
	import InstanceSharing = Typefac.Core.InstanceSharing;

	export class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function) {
            this.component = new ComponentRegistration(type);
        }

        public component: IComponentRegistration;

        public asSelf = (): IRegistrationBuilder => {
			var className = ObjectEx.getClassName(this.component.type);

            return this.as(className);
        }

        public as = (serviceName: string): IRegistrationBuilder => {
			var serviceNameLower = serviceName.toLowerCase();

			var matchedCollectionNamingRule = ArrayEx.firstOrDefault(Configuration.collectionNamingRules,(rule) => {
				if (rule.isCollection(serviceNameLower)) {
					return true;
				}

				return false;
			});
			
			if (matchedCollectionNamingRule) {
				var ruleTypeName = ObjectEx.getClassName(matchedCollectionNamingRule);
				throw new Error(`Could not register '${serviceName}' because it matches the reserved collection naming rule '${ruleTypeName}'.`);
            }

            if (this.component.names.indexOf(serviceNameLower) !== -1) {
				var className = ObjectEx.getClassName(this.component.type);
				throw new Error(`Could not register '${className}' as '${serviceName}' because is has already been registered using that name.`);
            }
            
			this.component.names.push(serviceNameLower);
            return this;
        }

        public instancePerDependency = (): IRegistrationBuilder => {
            this.component.sharing = InstanceSharing.None;
            return this;
        }

        public singleInstance = (): IRegistrationBuilder => {
            this.component.sharing = InstanceSharing.Shared;
            return this;
        }
    }
}