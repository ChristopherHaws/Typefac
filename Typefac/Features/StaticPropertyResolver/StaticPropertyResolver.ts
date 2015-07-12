module Typefac.Features.StaticPropertyResolver {
	import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    import ObjectEx = Typefac.Utilities.ObjectEx;

    export class StaticPropertyResolver implements ICanResolveParameters {
		private functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;

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

        public getServices(componentRegistration: IComponentRegistration): string[]{
            if (!this.canResolve(componentRegistration)) {
                var className = ObjectEx.getClassName(componentRegistration.type);
                throw new Error(`StaticPropertyResolver is not able to get the services from '${className}'.`);
            }

            var requestedServices = <Array<string>>componentRegistration.type["$inject"];

            return requestedServices;
        }

		private getParameterCount(component: Typefac.Core.Registration.IComponentRegistration): number {
            var result = component.type.toString().match(this.functionArguments);

            if (result === null || result[1] === "") {
                return 0;
            }

			return result[1].length;
        }

        private validateParameterCount(componentRegistration: IComponentRegistration, requestedServices: Array<any>): boolean {
			var parameterCount = this.getParameterCount(componentRegistration);

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

	export interface ICanResolveParameters {
		canResolve(componentRegistration: IComponentRegistration): boolean;
		getServices(componentRegistration: IComponentRegistration): string[];
	}
}