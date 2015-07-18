/// <reference path="../utilities/objectex.ts" />
module Typefac.Core {
	import ObjectEx = Typefac.Utilities.ObjectEx;

	export class TypeService implements Service {
		constructor(serviceType: Function) {
			this.serviceType = serviceType;
		}

		public serviceType: Function;

		public get description(): string {
			return ObjectEx.getClassName(this.serviceType);
		}
	}
}