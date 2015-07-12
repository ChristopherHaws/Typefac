module Typefac.Core.Lifetime {
	/**
	 * Defines a nested structure of lifetimes.
	 */
	export interface ISharingLifetimeScope extends ILifetimeScope {
		/**
		 * The root of the sharing hierarchy.
		 */
		rootLifetimeScope: ISharingLifetimeScope;

		/**
		 * The parent of this node of the hierarchy, or null.
		 */
		parentLifetimeScope: ISharingLifetimeScope;
		
		/**
		 * Try to retrieve an instance based on a GUID key. If the instance does not exist, invoke creator to create it.
		 * @param id - Key to look up.
		 * @param creator - Creation function.
		 * @returns {Object} An instance.
		 */
		getOrCreateAndShare(id: Utilities.Guid, creator: () => Object): Object;
	}
}