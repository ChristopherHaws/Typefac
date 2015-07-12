module Typefac.Core.Registration {
	/**
	 * Describes a logical component within the container.
	 */
    export interface IComponentRegistration {
		/**
		 * A unique identifier for this component (shared in all sub-contexts.) This value also appears in Services.
		 */
		id: Utilities.Guid;

		/**
		 * The lifetime associated with the component.
		 */
		lifetime: Lifetime.IComponentLifetime;

		/**
		 * The names this component is registered as.
		 */
        names: string[];

		/**
		 * Whether the component instances are shared or not.
		 */
        sharing: Core.InstanceSharing;

		/**
		 * The type of class.
		 */
        type: Function;

		/**
		 * This instance of the class.
		 */
        instance: Object;

        /**
         * The name of the type.
         */
        typeName: string;
    }
}