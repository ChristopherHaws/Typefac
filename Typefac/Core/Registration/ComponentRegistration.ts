/// <reference path="../../utilities/objectex.ts" />
module Typefac.Core.Registration {
    import ObjectEx = Typefac.Utilities.ObjectEx;

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
        public get typeName(): string {
            return ObjectEx.getClassName(this.type);
        }
    }
}