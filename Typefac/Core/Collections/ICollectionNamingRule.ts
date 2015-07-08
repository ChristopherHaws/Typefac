module Typefac.Core.Collections {
	export interface ICollectionNamingRule {
		isCollection(name: string): boolean;
		getName(name: string): string;
	}
}