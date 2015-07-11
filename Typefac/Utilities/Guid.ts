module Typefac.Utilities {
	export class Guid {
		constructor(private a: string, private b: string, private c: string, private d: string, private e: string) {
			
		}
		public static newGuid() {
			return new Guid(Guid.s4() + Guid.s4(), Guid.s4(), Guid.s4(), Guid.s4(), Guid.s4() + Guid.s4() + Guid.s4());
		}

		public toString() {
			return `${this.a}-${this.b}-${this.c}-${this.d}-${this.e}`;
		}

		private static s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
	}
}