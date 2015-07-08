module Typefac.Core.Collections {
	export class CollectionSuffixCollectionNamingRule implements Typefac.Core.Collections.ICollectionNamingRule {
		public isCollection = (name: string): boolean => {
			return Typefac.Utilities.StringEx.endsWith(name, "Collection", true);
		}
		
		public getName = (name: string): string => {
			return Typefac.Utilities.StringEx.removeFromEnd(name, "Collection", true);
		}
	}
}