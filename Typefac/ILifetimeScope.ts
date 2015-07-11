module Typefac {
	export interface ILifetimeScope {
		beginLifetimeScope(callback: (scope: ILifetimeScope) => void): void;
	}
}