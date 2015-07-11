module Typefac.Core.Registration {
	export class ComponentRegistrationLifetimeDecorator implements IComponentRegistration {
		private inner: IComponentRegistration;

		constructor(inner: IComponentRegistration, lifetime: Lifetime.IComponentLifetime) {
			if (inner == null) {
				throw new Error("Value cannot be null.\nParameter name: inner");
			}

			if (lifetime == null) {
				throw new Error("Value cannot be null.\nParameter name: lifetime");
			}

			this.inner = inner;
			this.lifetime = lifetime;
		}

		public get id(): Utilities.Guid {
			return this.inner.id;
		}

		public get lifetime(): Core.Lifetime.IComponentLifetime {
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
	}
}