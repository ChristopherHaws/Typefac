module Typefac.Core {
	export class Configuration {
        public static collectionNamingRules: Core.Collections.ICollectionNamingRule[] = [];
        public static serviceResolvers: Core.Resolving.IServiceResolver[] = [];
	}

	$(() => {
        Configuration.collectionNamingRules = [
            new Core.Collections.ArraySuffixCollectionNamingRule(),
            new Core.Collections.CollectionSuffixCollectionNamingRule()
        ];

        Configuration.serviceResolvers = [
            new Features.ServiceResolvers.ConstructorServiceResolver(),
            new Features.ServiceResolvers.StaticPropertyServiceResolver()
        ];
	});
}
