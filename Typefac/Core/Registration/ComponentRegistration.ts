module Typefac.Core.Registration {
    export class ComponentRegistration implements IComponentRegistration {
        constructor(type: Function) {
            this.names = [];
            this.sharing = Typefac.Core.InstanceSharing.None;
            this.type = type;
        }

        public names: string[];
        public sharing: Typefac.Core.InstanceSharing;
        public type: Function;
        public instance: Object;
    }
}