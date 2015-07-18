module Typefac {
	/**
	 * The context in which a service can be accessed or a component's dependencies resolved. Disposal of a context will dispose any owned components.
	 */
	export interface IComponentContext {
		/**
		 * Associates services with the components that provide them.
		 */
		componentRegistry: Core.Registration.IComponentRegistry;

		/**
		 * Resolve an instance of the provided registration within the context.
		 * @param registration - The registration.
		 * @param parameters - Parameters for the instance.
		 * @returns - The component instance.
		 * @throws {ComponentNotRegisteredException}
		 * @throws {DependencyResolutionException}
		 */
        resolveComponent(registration: Core.Registration.IComponentRegistration, parameters: any[]): Object;
	}
}