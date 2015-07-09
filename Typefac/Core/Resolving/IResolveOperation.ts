module Typefac.Core.Resolving {
    export interface IResolveOperation {
        getOrCreateInstance(registration: Registration.IComponentRegistration, parameters: Array<any>): Object;
    }
}