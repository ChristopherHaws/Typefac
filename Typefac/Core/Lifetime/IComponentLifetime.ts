module Typefac.Core.Lifetime {
	/**
	 * Locates the lifetime to which instances of a component should be attached.
	 */
	export interface IComponentLifetime {
		/**
		 * Given the most nested scope visible within the resolve operation, find the scope for the component.
		 * @param mostNestedVisibleScope - The most nested visible scope.
		 * @returns {ISharingLifetimeScope} The scope for the component.
		 */
		findScope(mostNestedVisibleScope: ISharingLifetimeScope): ISharingLifetimeScope;
	}
}