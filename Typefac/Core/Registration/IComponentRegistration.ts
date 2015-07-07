module Typefac.Core.Registration {
    export interface IComponentRegistration {
        names: string[];
        sharing: Typefac.Core.InstanceSharing;
        type: Function;
        instance: Object;
    }
}