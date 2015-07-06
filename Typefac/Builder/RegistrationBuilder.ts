module Typefac.Builder {
    export class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function) {
            this.component = new Typefac.Core.Registration.ComponentRegistration(type);
        }

        public component: Typefac.Core.Registration.ComponentRegistration;

        public as(serviceName: string): IRegistrationBuilder {
            this.component.names.push(serviceName);
            return this;
        }

        public instancePerDependency(): IRegistrationBuilder {
            this.component.sharing = Typefac.Core.InstanceSharing.None;
            return this;
        }

        public singleInstance(): IRegistrationBuilder {
            this.component.sharing = Typefac.Core.InstanceSharing.Shared;
            return this;
        }
    }
}