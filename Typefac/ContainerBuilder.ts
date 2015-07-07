module Typefac {
	export class ContainerBuilder {
		private wasBuilt: boolean;
		private registrations: Typefac.Builder.IRegistrationBuilder[];

		constructor() {
			this.wasBuilt = false;
			this.registrations = [];
		}

		public build = (): Typefac.Core.IContainer => {
			if (this.wasBuilt) {
				throw new Error("build() or update() can only be called once on a ContainerBuilder.");
			}

			var container = new Typefac.Core.Container();

            for (var i = 0; i < this.registrations.length; i++) {
                var registration = this.registrations[i];
                
				container.componentRegistry.register(registration.component);
			}

			this.wasBuilt = true;

			return container;
		}

		public registerType = (type: Function): Typefac.Builder.IRegistrationBuilder => {
			var registration = new Typefac.Builder.RegistrationBuilder(type);
			
			this.registrations.push(registration);
			
			return registration;
		}
	}
}