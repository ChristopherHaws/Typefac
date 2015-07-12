module Typefac.Core.Registration {
    export class ComponentRegistration implements IComponentRegistration {
        constructor(type: Function) {
            this.names = [];
            this.sharing = Core.InstanceSharing.None;
            this.type = type;
        }

		public id: Utilities.Guid;
		public lifetime: Core.Lifetime.IComponentLifetime;
        public names: string[];
        public sharing: Core.InstanceSharing;
        public type: Function;
        public instance: Object;
    }
}