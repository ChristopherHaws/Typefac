module Typefac.Core.Registration {
    export class ComponentRegistration implements IComponentRegistration {
        constructor() {
            this.Names = [];
            this.Sharing = Typefac.Core.InstanceSharing.None;
        }

        public Names: string[];
        public Sharing: Typefac.Core.InstanceSharing;
        public Type: Object;
    }
}