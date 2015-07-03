module Typefac.Core.Registration {
    export class ComponentRegistration implements IComponentRegistration {
        constructor(type: Function) {
            this.Names = [];
            this.Sharing = Typefac.Core.InstanceSharing.None;
            this.Type = type;
        }

        public Names: string[];
        public Sharing: Typefac.Core.InstanceSharing;
        public Type: Function;
    }
}