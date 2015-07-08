module Typefac.Utilities {
	export class ArrayEx {
		public static any = <T>(values: T[], predicate: (value: T, index: number) => boolean): boolean => {
			for (var i = 0; i < values.length; i++) {
				var value = values[i];
				
				if (predicate(value, i)) {
					return true;
				}
			}
			
			return false;
		}
		
		public static firstOrDefault = <T>(values: T[], predicate: (value: T, index: number) => boolean): T => {
			for (var i = 0; i < values.length; i++) {
				var value = values[i];
				
				if (predicate(value, i)) {
					return value;
				}
			}
			
			return null;
		}
		
		public static lastOrDefault = <T>(values: T[], predicate: (value: T, index: number) => boolean): T => {
			for (var i = values.length - 1; i > 0; i--) {
				var value = values[i];
				
				if (predicate(value, i)) {
					return value;
				}
			}
			
			return null;
		}
		
		public static where = <T>(values: T[], predicate: (value: T, index: number) => boolean): T[] => {
			var matches: T[] = [];
			
			for (var i = 0; i < values.length; i++) {
				var value = values[i];
				
				if (predicate(value, i)) {
					matches.push(value);
				}
			}
			
			return matches;
		}
	}
}