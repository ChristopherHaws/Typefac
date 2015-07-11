//module Typefac {
//	declare class Error {
//		public name: string;
//		public message: string;
//		constructor(message?: string);
//	}

//	export class Exception implements Error {
//        constructor(message: string) {
//            this.name = "Exception";
//            this.message = message;
//            this.stack = (<any>new Error()).stack;
//        }

//		public name: string;
//		public message: string;
//        public stack: string;

//	    public toString() {
//			return `${this.name}: ${this.message}\n${this.stack}`;
//        }
//    }
//}