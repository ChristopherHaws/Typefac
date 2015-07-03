module Typefac {
	export class ContainerBuilder {
		private wasBuilt: boolean;
		private registrations: Typefac.Builder.IRegistrationBuilder[];

		public Build(): Typefac.Core.IContainer {
			if (this.wasBuilt) {
				throw "build() or update() can only be called once on a ContainerBuilder.";
			}

			var container = new Typefac.Core.Container();

			for (var registration in this.registrations) {
				if (this.registrations.hasOwnProperty(registration)) {
					container.ComponentRegistry.Register(registration);
				}
			}

			this.wasBuilt = true;

			return container;
		}

		public RegisterType(type: Function): Typefac.Builder.IRegistrationBuilder {
			return new Typefac.Builder.RegistrationBuilder(type);
		}
	}
}