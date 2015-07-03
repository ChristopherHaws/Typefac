module Typefac.Core {
    export interface IContainer {
        ComponentRegistry: Registration.IComponentRegistry;

        ResolveComponent<T>(name: string): T;
    }

    export class Container implements IContainer {
        public ComponentRegistry: Registration.IComponentRegistry;

        public ResolveComponent<T>(name: string): T {
            return null;
        }
    }
}