module Typefac.Core.Collections {
	export class CollectionSuffixCollectionNamingRule implements Collections.ICollectionNamingRule {
		public isCollection = (name: string): boolean => {
			return Utilities.StringEx.endsWith(name, "Collection", true);
		}
		
		public getName = (name: string): string => {
			return Utilities.StringEx.removeFromEnd(name, "Collection", true);
		}
	}
}