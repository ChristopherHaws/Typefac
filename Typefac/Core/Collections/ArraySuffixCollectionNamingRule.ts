module Typefac.Core.Collections {
	export class ArraySuffixCollectionNamingRule implements Typefac.Core.Collections.ICollectionNamingRule {
		public isCollection = (name: string): boolean => {
			return Typefac.Utilities.StringEx.endsWith(name, "Array", true);
		}
		
		public getName = (name: string): string => {
			return Typefac.Utilities.StringEx.removeFromEnd(name, "Array", true);
		}
	}
}