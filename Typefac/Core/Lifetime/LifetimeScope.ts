module Typefac.Core.Lifetime {
	export class LifetimeScope implements ILifetimeScope {
		private selfRegistrationId: Typefac.Utilities.Guid;
		private sharedInstances: {[id: string]: ILifetimeScope };

		constructor() {
			this.selfRegistrationId = Typefac.Utilities.Guid.newGuid();
		}
		public beginLifetimeScope = (callback: (scope: ILifetimeScope) => void) => {
			var scope = new LifetimeScope();

			callback(scope);
		}
	}
}