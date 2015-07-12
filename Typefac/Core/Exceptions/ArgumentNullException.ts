/// <reference path="exception.ts" />

module Typefac {
    export class ArgumentNullException extends Exception {
		private parameter: string;

        constructor(parameter?: string, message?: string) {
            this.name = "ArgumentNullException";

	        if (!message) {
		        message = "Value cannot be null.";
			}

	        if (parameter) {
				message += `\nParameter name: ${parameter}`;
			}

			super(message);
        }
    }
}