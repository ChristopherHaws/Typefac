module Typefac {
	/**
	 * An ILifetimeScope tracks the instantiation of component instances.
	 * It defines a boundary in which instances are shared and configured.
	 */
	export interface ILifetimeScope {
		/**
		 * The tag applied to the ILifetimeScope.
		 * Tags allow a level in the lifetime hierarchy to be identified.
		 */
		tag: string;

		/**
		 * Begin a new nested scope. Component instances created via the new scope will be disposed along with it.
		 * @param callback 
		 * @returns {ILifetimeScope} A new lifetime scope.
		 */
		beginLifetimeScope(callback: (scope: ILifetimeScope) => void): void;
	}
}