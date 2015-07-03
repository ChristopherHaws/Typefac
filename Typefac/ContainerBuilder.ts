module Typefac {
	export class ContainerBuilder {
		private wasBuilt: boolean;
		private registrations: Typefac.Builder.IRegistrationBuilder[];

		public Build(): Typefac.Core.IContainer {
			if (this.wasBuilt) {
				throw new Error("build() or update() can only be called once on a ContainerBuilder.");
			}

			var container = new Typefac.Core.Container();

            for (var i = 0; i < this.registrations.length; i++) {
                var registration = this.registrations[i];
                
				container.ComponentRegistry.Register(registration.Component);
			}

			this.wasBuilt = true;

			return container;
		}

		public RegisterType(type: Function): Typefac.Builder.IRegistrationBuilder {
			return new Typefac.Builder.RegistrationBuilder(type);
		}
	}
}