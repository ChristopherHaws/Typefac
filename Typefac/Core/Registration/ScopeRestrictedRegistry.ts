module Typefac.Core.Registration {
	export class ScopeRestrictedRegistry extends ComponentRegistry {
		private restrictedRootScopeLifetime: Lifetime.IComponentLifetime;

		constructor(scopeTag: string) {
			super();

			this.restrictedRootScopeLifetime = new Lifetime.MatchingLifetimeScope([scopeTag]);
		}

		public register = (registration: Registration.IComponentRegistration): void => {
			if (registration == null) {
				throw new ArgumentNullException("registration");
			}

			var toRegister = registration;

			if (registration.lifetime instanceof Lifetime.RootScopeLifetime) {
				toRegister = new ComponentRegistrationLifetimeDecorator(registration, this.restrictedRootScopeLifetime);
			}

            this.components.push(toRegister);
		}
	}
}