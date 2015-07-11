module Typefac.Utilities {
	export class ArrayEx {
		public static firstOrDefault = <T>(values: T[], predicate: (value: T, index: number) => boolean): T => {
			var length = values.length;
			for (var i = 0; i < length; i++) {
				var value = values[i];

				if (predicate(value, i)) {
					return value;
				}
			}

			return null;
		}

		public static lastOrDefault = <T>(values: T[], predicate: (value: T, index: number) => boolean): T => {
			for (var i = values.length - 1; i >= 0; i--) {
				var value = values[i];

				if (predicate(value, i)) {
					return value;
				}
			}

			return null;
		}
	}
}