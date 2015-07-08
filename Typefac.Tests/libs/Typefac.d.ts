declare module Typefac {
    class ContainerBuilder {
        private wasBuilt;
        private registrations;
        constructor();
        build: () => Core.IContainer;
        registerType: (type: Function) => Builder.IRegistrationBuilder;
    }
}
declare module Typefac.Builder {
    interface IRegistrationBuilder {
        component: Typefac.Core.Registration.ComponentRegistration;
        as(name: string): IRegistrationBuilder;
        instancePerDependency(): IRegistrationBuilder;
        singleInstance(): IRegistrationBuilder;
    }
}
declare module Typefac.Builder {
    class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function);
        component: Typefac.Core.Registration.ComponentRegistration;
        as: (serviceName: string) => IRegistrationBuilder;
        instancePerDependency: () => IRegistrationBuilder;
        singleInstance: () => IRegistrationBuilder;
    }
}
declare module Typefac.Core {
    interface IContainer {
        componentRegistry: Registration.IComponentRegistry;
        resolve<T>(name: string): T;
        resolveSingle<T>(name: string): T;
        resolveMultiple<T>(name: string): T[];
    }
    class Container implements IContainer {
        private functionArguments;
        private collectionNamingRules;
        constructor();
        componentRegistry: Registration.IComponentRegistry;
        resolve: <T>(name: string) => T;
        resolveSingle: <T>(name: string) => T;
        resolveMultiple: <T>(name: string) => T[];
        private resolveComponent;
        private getParameters;
        private resolveParameters;
        private createDependancies;
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
declare module Typefac.Utilities {
    class ArrayEx {
        static any: <T>(values: T[], predicate: (value: T, index: number) => boolean) => boolean;
        static firstOrDefault: <T>(values: T[], predicate: (value: T, index: number) => boolean) => T;
        static lastOrDefault: <T>(values: T[], predicate: (value: T, index: number) => boolean) => T;
        static where: <T>(values: T[], predicate: (value: T, index: number) => boolean) => T[];
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
declare module Typefac.Core.Registration {
    class ComponentRegistration implements IComponentRegistration {
        constructor(type: Function);
        names: string[];
        sharing: Typefac.Core.InstanceSharing;
        type: Function;
        instance: Object;
    }
}
declare module Typefac.Core.Registration {
    class ComponentRegistry implements Typefac.Core.Registration.IComponentRegistry {
        private components;
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
    interface IComponentRegistration {
        names: string[];
        sharing: Typefac.Core.InstanceSharing;
        type: Function;
        instance: Object;
    }
}
declare module Typefac.Core.Registration {
    interface IComponentRegistry {
        register: (component: Typefac.Core.Registration.IComponentRegistration) => void;
        isRegistered: (name: string) => boolean;
        getRegistration(name: string): Typefac.Core.Registration.IComponentRegistration;
        getRegistrationOrNull(name: string): Typefac.Core.Registration.IComponentRegistration;
        getRegistrations(name: string): Typefac.Core.Registration.IComponentRegistration[];
        getRegistrationsOrNull(name: string): Typefac.Core.Registration.IComponentRegistration[];
    }
}
declare module Typefac.Core.Collections {
    class ArraySuffixCollectionNamingRule implements Typefac.Core.Collections.ICollectionNamingRule {
        isCollection: (name: string) => boolean;
        getName: (name: string) => string;
    }
}
declare module Typefac.Core.Collections {
    class CollectionSuffixCollectionNamingRule implements Typefac.Core.Collections.ICollectionNamingRule {
        isCollection: (name: string) => boolean;
        getName: (name: string) => string;
    }
}
declare module Typefac.Core.Collections {
    interface ICollectionNamingRule {
        isCollection(name: string): boolean;
        getName(name: string): string;
    }
}
