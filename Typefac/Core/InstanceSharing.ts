module Typefac.Core
{
	/**
	 * Determines whether instances are shared within a lifetime scope.
	 */
    export enum InstanceSharing
    {
        /**
		 * Each request for an instance will return a new object.
		 */
        None,

        /**
		 * Each request for an instance will return the same object.
		 */
        Shared
    }
}