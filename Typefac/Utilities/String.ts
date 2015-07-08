module Typefac.Utilities {
	export class StringEx {
		public static startsWith(value: string, prefix: string, ignoreCase?: boolean): boolean {
			var tempValue = value;
			var tempPrefix = prefix;
			
			if (ignoreCase) {
				tempValue = value.toLowerCase();
				tempPrefix = prefix.toLowerCase();
			}
			
			return tempValue.indexOf(tempPrefix) === 0;
		}
		
		public static endsWith(value: string, suffix: string, ignoreCase?: boolean): boolean {
			var tempValue = value;
			var tempSuffix = suffix;
			
			if (ignoreCase) {
				tempValue = value.toLowerCase();
				tempSuffix = suffix.toLowerCase();
			}
			
			return tempValue.indexOf(tempSuffix, tempValue.length - tempSuffix.length) !== -1;
		}
		
		public static contains(value: string, search: string, ignoreCase?: boolean): boolean {
			var tempValue = value;
			var tempSearch = search;
			
			if (ignoreCase) {
				tempValue = value.toLowerCase();
				tempSearch = search.toLowerCase();
			}
			
			return tempValue.indexOf(tempSearch) !== -1;
		}
		
		public static removeFromBeginning(value: string, prefix: string, ignoreCase?: boolean): string {
			var tempValue = value;
			var tempPrefix = prefix;
			
			if (ignoreCase) {
				tempValue = value.toLowerCase();
				tempPrefix = prefix.toLowerCase();
			}
			
			return tempValue.substr(tempPrefix.length, tempValue.length);
		}
		
		public static removeFromEnd(value: string, suffix: string, ignoreCase?: boolean): string {
			var tempValue = value;
			var tempSuffix = suffix;
			
			if (ignoreCase) {
				tempValue = value.toLowerCase();
				tempSuffix = suffix.toLowerCase();
			}
			
			return tempValue.substr(0, tempValue.length - tempSuffix.length);
		}
	}
}