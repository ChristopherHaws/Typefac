/// <reference path="../Typefac/bower_components/dt-jquery/jquery.d.ts" />
declare module Typefac {
    class ContainerBuilder {
        private wasBuilt;
        private registrations;
        constructor();
        build: () => Core.IContainer;
        registerType: (type: Function) => Builder.IRegistrationBuilder;
        registerInstance: (instance: Object) => Builder.IRegistrationBuilder;
    }
}
declare module Typefac {
    /**
     * The context in which a service can be accessed or a component's dependencies resolved. Disposal of a context will dispose any owned components.
     */
    interface IComponentContext {
        /**
         * Associates services with the components that provide them.
         */
        componentRegistry: Core.Registration.IComponentRegistry;
        /**
         * Resolve an instance of the provided registration within the context.
         * @param registration - The registration.
         * @param parameters - Parameters for the instance.
         * @returns - The component instance.
         * @throws {ComponentNotRegisteredException}
         * @throws {DependencyResolutionException}
         */
        resolveComponent(registration: Core.Registration.IComponentRegistration, parameters: any[]): any;
    }
}
declare module Typefac {
    /**
     * An ILifetimeScope tracks the instantiation of component instances.
     * It defines a boundary in which instances are shared and configured.
     */
    interface ILifetimeScope {
        /**
         * The tag applied to the ILifetimeScope.
         * Tags allow a level in the lifetime hierarchy to be identified.
         */
        tag: string;
        /**
         * Begin a new nested scope. Component instances created via the new scope will be disposed along with it.
         * @param callback
         * @returns {ILifetimeScope} A new lifetime scope.
         */
        beginLifetimeScope(callback: (scope: ILifetimeScope) => void): void;
    }
}
declare module Typefac.Builder {
    interface IRegistrationBuilder {
        component: Core.Registration.IComponentRegistration;
        asSelf(): IRegistrationBuilder;
        as(name: string): IRegistrationBuilder;
        instancePerDependency(): IRegistrationBuilder;
        singleInstance(): IRegistrationBuilder;
    }
}
declare module Typefac.Utilities {
    class ArrayEx {
        static firstOrDefault: <T>(values: T[], predicate: (value: T, index: number) => boolean) => T;
        static lastOrDefault: <T>(values: T[], predicate: (value: T, index: number) => boolean) => T;
    }
}
declare module Typefac.Utilities {
    class ObjectEx {
        private static funcNameRegex;
        private static functionArguments;
        static getClassName(value: Object): string;
        static getFunctionArgumentsNames(type: Function): string[];
    }
}
declare module Typefac.Core.Collections {
    class ArraySuffixCollectionNamingRule implements Collections.ICollectionNamingRule {
        isCollection: (name: string) => boolean;
        getName: (name: string) => string;
    }
}
declare module Typefac.Core.Collections {
    class CollectionSuffixCollectionNamingRule implements Collections.ICollectionNamingRule {
        isCollection: (name: string) => boolean;
        getName: (name: string) => string;
    }
}
declare module Typefac.Features.ServiceResolvers {
    import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    import IServiceResolver = Typefac.Core.Resolving.IServiceResolver;
    class ConstructorServiceResolver implements IServiceResolver {
        canResolve(componentRegistration: IComponentRegistration): boolean;
        getServiceNames(componentRegistration: IComponentRegistration): string[];
    }
}
declare module Typefac.Features.ServiceResolvers {
    import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    import IServiceResolver = Typefac.Core.Resolving.IServiceResolver;
    class StaticPropertyServiceResolver implements IServiceResolver {
        canResolve(componentRegistration: IComponentRegistration): boolean;
        getServiceNames(componentRegistration: IComponentRegistration): string[];
        private validateParameterCount(componentRegistration, requestedServices);
        private validateAllStrings(componentRegistration, requestedServices);
    }
}
declare module Typefac.Core {
    class Configuration {
        static collectionNamingRules: Core.Collections.ICollectionNamingRule[];
        static serviceResolvers: Core.Resolving.IServiceResolver[];
    }
}
declare module Typefac.Core.Registration {
    class ComponentRegistration implements IComponentRegistration {
        constructor(type: Function);
        id: Utilities.Guid;
        lifetime: Core.Lifetime.IComponentLifetime;
        names: string[];
        sharing: Core.InstanceSharing;
        type: Function;
        instance: Object;
        typeName: string;
    }
}
declare module Typefac.Core.Registration {
    /**
     * Describes a logical component within the container.
     */
    interface IComponentRegistration {
        /**
         * A unique identifier for this component (shared in all sub-contexts.) This value also appears in Services.
         */
        id: Utilities.Guid;
        /**
         * The lifetime associated with the component.
         */
        lifetime: Lifetime.IComponentLifetime;
        /**
         * The names this component is registered as.
         */
        names: string[];
        /**
         * Whether the component instances are shared or not.
         */
        sharing: Core.InstanceSharing;
        /**
         * The type of class.
         */
        type: Function;
        /**
         * This instance of the class.
         */
        instance: Object;
        /**
         * The name of the type.
         */
        typeName: string;
    }
}
declare module Typefac.Core {
    /**
     * Determines whether instances are shared within a lifetime scope.
     */
    enum InstanceSharing {
        /**
         * Each request for an instance will return a new object.
         */
        None = 0,
        /**
         * Each request for an instance will return the same object.
         */
        Shared = 1,
    }
}
declare module Typefac.Builder {
    import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function);
        component: IComponentRegistration;
        asSelf: () => IRegistrationBuilder;
        as: (serviceName: string) => IRegistrationBuilder;
        instancePerDependency: () => IRegistrationBuilder;
        singleInstance: () => IRegistrationBuilder;
    }
}
declare module Typefac.Core {
    class Container implements IContainer {
        private functionArguments;
        constructor();
        componentRegistry: Registration.IComponentRegistry;
        resolve: <T>(name: string) => T;
        resolveSingle: <T>(name: string) => T;
        resolveMultiple: <T>(name: string) => T[];
        private resolveComponent;
        private createDependancies;
    }
}
declare module Typefac.Core {
    interface IContainer {
        componentRegistry: Registration.IComponentRegistry;
        resolve<T>(name: string): T;
        resolveSingle<T>(name: string): T;
        resolveMultiple<T>(name: string): T[];
    }
}
declare module Typefac.Utilities {
    class Guid {
        private a;
        private b;
        private c;
        private d;
        private e;
        constructor(a: string, b: string, c: string, d: string, e: string);
        static newGuid(): Guid;
        toString(): string;
        private static s4();
    }
}
declare module Typefac.Utilities {
    class StringEx {
        static startsWith(value: string, prefix: string, ignoreCase?: boolean): boolean;
        static endsWith(value: string, suffix: string, ignoreCase?: boolean): boolean;
        static contains(value: string, search: string, ignoreCase?: boolean): boolean;
        static removeFromBeginning(value: string, prefix: string, ignoreCase?: boolean): string;
        static removeFromEnd(value: string, suffix: string, ignoreCase?: boolean): string;
    }
}
declare module Typefac.Core.Collections {
    interface ICollectionNamingRule {
        isCollection(name: string): boolean;
        getName(name: string): string;
    }
}
declare module Typefac {
    class ErrorClass {
        name: string;
        message: string;
        constructor(message?: string);
    }
    class Exception implements ErrorClass {
        constructor(message: string);
        name: string;
        message: string;
        stack: string;
        toString(): string;
    }
}
declare module Typefac {
    class ArgumentNullException extends Exception {
        private parameter;
        constructor(parameter?: string, message?: string);
    }
}
declare module Typefac {
    class DependencyResolutionException extends Exception {
        constructor(message: string);
    }
}
declare module Typefac.Core.Lifetime {
    /**
     * Locates the lifetime to which instances of a component should be attached.
     */
    interface IComponentLifetime {
        /**
         * Given the most nested scope visible within the resolve operation, find the scope for the component.
         * @param mostNestedVisibleScope - The most nested visible scope.
         * @returns {ISharingLifetimeScope} The scope for the component.
         */
        findScope(mostNestedVisibleScope: ISharingLifetimeScope): ISharingLifetimeScope;
    }
}
declare module Typefac.Core.Lifetime {
    /**
     * Defines a nested structure of lifetimes.
     */
    interface ISharingLifetimeScope extends ILifetimeScope {
        /**
         * The root of the sharing hierarchy.
         */
        rootLifetimeScope: ISharingLifetimeScope;
        /**
         * The parent of this node of the hierarchy, or null.
         */
        parentLifetimeScope: ISharingLifetimeScope;
        /**
         * Try to retrieve an instance based on a GUID key. If the instance does not exist, invoke creator to create it.
         * @param id - Key to look up.
         * @param creator - Creation function.
         * @returns {Object} An instance.
         */
        getOrCreateAndShare(id: Utilities.Guid, creator: () => Object): Object;
    }
}
declare module Typefac.Core.Registration {
    interface IComponentRegistry {
        register: (component: Registration.IComponentRegistration) => void;
        isRegistered: (name: string) => boolean;
        getRegistration(name: string): Registration.IComponentRegistration;
        getRegistrationOrNull(name: string): Registration.IComponentRegistration;
        getRegistrations(name: string): Registration.IComponentRegistration[];
        getRegistrationsOrNull(name: string): Registration.IComponentRegistration[];
    }
}
declare module Typefac.Core.Lifetime {
    import IComponentRegistry = Typefac.Core.Registration.IComponentRegistry;
    class LifetimeScope implements ILifetimeScope {
        private selfRegistrationId;
        private static sharedInstances;
        constructor(componentRegistry: IComponentRegistry, tag?: string);
        tag: string;
        beginLifetimeScope: (callback: (scope: ILifetimeScope) => void) => void;
    }
}
declare module Typefac.Core.Lifetime {
    class MatchingLifetimeScope {
        private tagsToMatch;
        constructor(lifetimeScopeTagsToMatch: string[]);
        findScope(mostNestedVisibleScope: ISharingLifetimeScope): ISharingLifetimeScope;
    }
}
declare module Typefac.Core.Lifetime {
    class RootScopeLifetime implements IComponentLifetime {
        findScope(mostNestedVisibleScope: Lifetime.ISharingLifetimeScope): Lifetime.ISharingLifetimeScope;
    }
}
declare module Typefac.Core.Resolving {
    interface IResolveOperation {
        getOrCreateInstance(registration: Registration.IComponentRegistration, parameters: Array<any>): Object;
    }
}
declare module Typefac.Core.Resolving {
    import IComponentRegistration = Typefac.Core.Registration.IComponentRegistration;
    interface IServiceResolver {
        canResolve(componentRegistration: IComponentRegistration): boolean;
        getServiceNames(componentRegistration: IComponentRegistration): string[];
    }
}
declare module Typefac.Core.Registration {
    import IComponentLifetime = Typefac.Core.Lifetime.IComponentLifetime;
    import Guid = Utilities.Guid;
    class ComponentRegistrationLifetimeDecorator implements IComponentRegistration {
        private inner;
        constructor(inner: IComponentRegistration, lifetime: IComponentLifetime);
        id: Guid;
        lifetime: IComponentLifetime;
        names: string[];
        sharing: InstanceSharing;
        type: Function;
        instance: Object;
        typeName: string;
    }
}
declare module Typefac.Core.Registration {
    class ComponentRegistry implements Registration.IComponentRegistry {
        protected components: Registration.IComponentRegistration[];
        constructor();
        register: (component: IComponentRegistration) => void;
        isRegistered: (name: string) => boolean;
        getRegistration: (name: string) => IComponentRegistration;
        getRegistrationOrNull: (name: string) => IComponentRegistration;
        getRegistrations: (name: string) => IComponentRegistration[];
        getRegistrationsOrNull: (name: string) => IComponentRegistration[];
    }
}
declare module Typefac.Core.Registration {
    class ScopeRestrictedRegistry extends ComponentRegistry {
        private restrictedRootScopeLifetime;
        constructor(scopeTag: string);
        register: (registration: IComponentRegistration) => void;
    }
}
