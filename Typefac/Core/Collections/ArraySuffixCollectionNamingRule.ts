module Typefac.Core.Collections {
	export class ArraySuffixCollectionNamingRule implements Collections.ICollectionNamingRule {
		public isCollection = (name: string): boolean => {
			return Utilities.StringEx.endsWith(name, "Array", true);
		}
		
		public getName = (name: string): string => {
			return Utilities.StringEx.removeFromEnd(name, "Array", true);
		}
	}
}