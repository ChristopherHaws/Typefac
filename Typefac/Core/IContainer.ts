module Typefac.Core {
    export interface IContainer {
        componentRegistry: Registration.IComponentRegistry;

        resolve<T>(name: string): T;

        resolveSingle<T>(name: string): T;

        resolveMultiple<T>(name: string): T[];
    }
}