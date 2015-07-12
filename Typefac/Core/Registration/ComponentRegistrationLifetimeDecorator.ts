/// <reference path="../instancesharing.ts" />
/// <reference path="../../utilities/guid.ts" />
/// <reference path="../lifetime/icomponentlifetime.ts" />

module Typefac.Core.Registration {
	import IComponentLifetime = Typefac.Core.Lifetime.IComponentLifetime;
	import Guid = Utilities.Guid;

	export class ComponentRegistrationLifetimeDecorator implements IComponentRegistration {
		private inner: IComponentRegistration;

		constructor(inner: IComponentRegistration, lifetime: IComponentLifetime) {
			if (inner == null) {
				throw new ArgumentNullException("inner");
			}

			if (lifetime == null) {
				throw new ArgumentNullException("lifetime");
			}

			this.inner = inner;
			this.lifetime = lifetime;
		}

		public get id(): Guid {
			return this.inner.id;
		}

		public get lifetime(): IComponentLifetime {
			return this.lifetime;
		}

		public get names(): string[] {
			return this.inner.names;
		}

		public get sharing(): InstanceSharing {
			return this.inner.sharing;
		}

		public get type(): Function {
			return this.inner.type;
		}

		public get instance() {
			return this.inner.instance;
        }

        public get typeName(): string {
            return this.inner.typeName;
        }
	}
}