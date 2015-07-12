module Typefac.Features.ServiceResolvers {
	import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    import ObjectEx = Typefac.Utilities.ObjectEx;
    import IServiceResolver = Typefac.Core.Resolving.IServiceResolver;

    export class StaticPropertyServiceResolver implements IServiceResolver {
		public canResolve(componentRegistration: IComponentRegistration): boolean {
			if (!componentRegistration.type.hasOwnProperty("$inject") || !componentRegistration.type.propertyIsEnumerable("$inject")) {
				return false;
			}

            var requestedServices = <Array<any>>componentRegistration.type["$inject"];
            
            //TODO: Might want to check to see if all of the parameters are registered...
            var validationTests = [
                this.validateParameterCount(componentRegistration, requestedServices),
                this.validateAllStrings(componentRegistration, requestedServices)
            ];

            return validationTests.every((testResult: boolean) => {
                    return testResult;
            });
		}

        public getServiceNames(componentRegistration: IComponentRegistration): string[]{
            if (!this.canResolve(componentRegistration)) {
                var className = ObjectEx.getClassName(componentRegistration.type);
                throw new Error(`StaticPropertyResolver is not able to get the services from '${className}'.`);
            }

            var requestedServices = <Array<string>>componentRegistration.type["$inject"];

            return requestedServices;
        }
        
        private validateParameterCount(componentRegistration: IComponentRegistration, requestedServices: Array<any>): boolean {
            var parameterCount = ObjectEx.getFunctionArgumentsNames(componentRegistration.type).length;

            if (requestedServices.length !== parameterCount) {
				return false;
            }

			return true;
        }

        private validateAllStrings(componentRegistration: IComponentRegistration, requestedServices: Array<any>): boolean {
            return requestedServices.every((value) => {
                if (typeof value !== "string") {
                    return false;
                }

                return true;
            });
        }
	}
}