module Typefac.Core.Lifetime {
	export class RootScopeLifetime implements IComponentLifetime {
		public findScope(mostNestedVisibleScope: Lifetime.ISharingLifetimeScope): Lifetime.ISharingLifetimeScope {
			if (mostNestedVisibleScope == null) {
				throw new ArgumentNullException("mostNestedVisibleScope");
			}

			return mostNestedVisibleScope.rootLifetimeScope;
		}
	}
}