module Typefac {
	export class ContainerBuilder {
		private wasBuilt: boolean;
		private registrations: Builder.IRegistrationBuilder[];

		constructor() {
			this.wasBuilt = false;
			this.registrations = [];
		}

		public build = (): Core.IContainer => {
			if (this.wasBuilt) {
				throw new Error("build() or update() can only be called once on a ContainerBuilder.");
			}

            var container = new Core.Container();

            this.registrations.forEach((registration) => {
                container.componentRegistry.register(registration.component);
		    });

			this.wasBuilt = true;

			return container;
		}

		public registerType = (type: Function): Builder.IRegistrationBuilder => {
			var registration = new Builder.RegistrationBuilder(type);
			
			this.registrations.push(registration);
			
			return registration;
		}

		public registerInstance = (instance: Object): Builder.IRegistrationBuilder => {
			throw new Error("Not implemented");
		}
	}
}