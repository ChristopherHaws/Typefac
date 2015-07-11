﻿module Typefac.Core.Lifetime {
	export class MatchingLifetimeScope {
		private tagsToMatch: string[];

		constructor(lifetimeScopeTagsToMatch: string[]) {
			if (!lifetimeScopeTagsToMatch) {
				throw new Error("Value cannot be null.\nParameter name: lifetimeScopeTagsToMatch");
			}

			this.tagsToMatch = lifetimeScopeTagsToMatch;
		}

		public findScope(mostNestedVisibleScope: ISharingLifetimeScope) {
			if (!mostNestedVisibleScope) {
				throw new Error("Value cannot be null.\nParameter name: mostNestedVisibleScope");
			}

			var next = mostNestedVisibleScope;
			while (next != null) {
				if (this.tagsToMatch.indexOf(next.tag) !== -1) {
					return next;
				}

				next = next.parentLifetimeScope;
			}
			
			throw new Error(`No scope with a Tag matching '${this.tagsToMatch.join(", ")}' is visible from the scope in which the instance was requested.`);
		}
	}
}