module Typefac.Features.ServiceResolvers {
    import ObjectEx = Typefac.Utilities.ObjectEx;
    import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    import IServiceResolver = Typefac.Core.Resolving.IServiceResolver;

    export class ConstructorServiceResolver implements IServiceResolver {
        public canResolve(componentRegistration: IComponentRegistration): boolean {
            return true;
        }

        public getServiceNames(componentRegistration: IComponentRegistration): string[] {
            return ObjectEx.getFunctionArgumentsNames(componentRegistration.type);
        }
    }
}