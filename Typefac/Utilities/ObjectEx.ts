module Typefac.Utilities {
	export class ObjectEx {
		private static funcNameRegex = /function (.{1,})\(/;

		public static getClassName(value: Object) {
			var results = (ObjectEx.funcNameRegex).exec(value.constructor.toString());
			return (results && results.length > 1) ? results[1] : "";
        }

        public static getTypeClassName(value: Object) {
            var results = (ObjectEx.funcNameRegex).exec(value.toString());
            return (results && results.length > 1) ? results[1] : "";
        }
	}
}