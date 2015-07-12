/// <reference path="collections/arraysuffixcollectionnamingrule.ts" />
/// <reference path="collections/collectionsuffixcollectionnamingrule.ts" />
/// <reference path="../features/constructorserviceresolver/constructorserviceresolver.ts" />
/// <reference path="../features/staticpropertyserviceresolver/staticpropertyserviceresolver.ts" />

module Typefac.Core {
	export class Configuration {
        public static collectionNamingRules: Core.Collections.ICollectionNamingRule[] = [
            new Core.Collections.ArraySuffixCollectionNamingRule(),
            new Core.Collections.CollectionSuffixCollectionNamingRule()
        ];
        public static serviceResolvers: Core.Resolving.IServiceResolver[] = [
            new Features.ServiceResolvers.ConstructorServiceResolver(),
            new Features.ServiceResolvers.StaticPropertyServiceResolver()
        ];
	}

	//$(() => {
 //       //Configuration.collectionNamingRules = [
 //       //    new Core.Collections.ArraySuffixCollectionNamingRule(),
 //       //    new Core.Collections.CollectionSuffixCollectionNamingRule()
 //       //];

 //       //Configuration.serviceResolvers = [
 //       //    new Features.ServiceResolvers.ConstructorServiceResolver(),
 //       //    new Features.ServiceResolvers.StaticPropertyServiceResolver()
 //       //];
	//});
}
