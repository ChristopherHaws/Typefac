module Typefac.Core.Lifetime {
	export class LifetimeScope implements ILifetimeScope {
		private selfRegistrationId: Utilities.Guid;
		private static sharedInstances: {[id: string]: ILifetimeScope };

		constructor(tag?: string) {
			this.selfRegistrationId = Utilities.Guid.newGuid();
			LifetimeScope.sharedInstances[this.selfRegistrationId.toString()] = this;

			if (tag) {
				this.tag = tag;
			} else {
				this.tag = "root";
			}
		}

		public tag: string;

		public beginLifetimeScope = (callback: (scope: ILifetimeScope) => void) => {
			var scope = new LifetimeScope();

			callback(scope);
		}
	}
}