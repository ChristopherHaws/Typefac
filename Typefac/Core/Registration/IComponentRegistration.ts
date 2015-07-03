module Typefac.Core.Registration {
    export interface IComponentRegistration {
        Names: string[];
        Sharing: Typefac.Core.InstanceSharing;
        Type: Function;
    }
}