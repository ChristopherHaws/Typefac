module Typefac.Builder {
    export class RegistrationBuilder implements IRegistrationBuilder {
        constructor(type: Function) {
            this.Component = new Typefac.Core.Registration.ComponentRegistration(type);
        }

        public Component: Typefac.Core.Registration.ComponentRegistration;

        public As(serviceName: string): IRegistrationBuilder {
            this.Component.Names.push(serviceName);
            return this;
        }

        public InstancePerDependency(): IRegistrationBuilder {
            this.Component.Sharing = Typefac.Core.InstanceSharing.None;
            return this;
        }

        public SingleInstance(): IRegistrationBuilder {
            this.Component.Sharing = Typefac.Core.InstanceSharing.Shared;
            return this;
        }
    }
}