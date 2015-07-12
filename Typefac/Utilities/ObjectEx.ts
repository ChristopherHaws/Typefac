module Typefac.Utilities {
	export class ObjectEx {
        private static funcNameRegex = /function (.{1,})\(/;
        private static functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;

		public static getClassName(value: Object) {
			var results: RegExpExecArray;

			if (typeof value == "object") {
				results = (ObjectEx.funcNameRegex).exec((value).constructor.toString());
			} else {
				results = (ObjectEx.funcNameRegex).exec((value).toString());
			}

			return (results && results.length > 1) ? results[1] : "";
        }

        public static getFunctionArgumentsNames(type: Function): string[] {
            var result = type.toString().match(this.functionArguments);
            if (result === null) {
                return new Array<string>();
            }

            if (result[1] === "") {
                return new Array<string>();
            }

            return new Array<string>(result[1]);
        }
	}
}