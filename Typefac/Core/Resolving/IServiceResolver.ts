module Typefac.Core.Resolving {
    import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;

    export interface IServiceResolver {
        canResolve(componentRegistration: IComponentRegistration): boolean;
        getServiceNames(componentRegistration: IComponentRegistration): string[];
    }
}