module Typefac.Core.Lifetime {
	export class RootScopeLifetime implements IComponentLifetime {
		public findScope(mostNestedVisibleScope: Lifetime.ISharingLifetimeScope): Lifetime.ISharingLifetimeScope {
			if (mostNestedVisibleScope == null) {
				throw new Error("Value cannot be null.\nParameter name: mostNestedVisibleScope");
			}

			return mostNestedVisibleScope.rootLifetimeScope;
		}
	}
}