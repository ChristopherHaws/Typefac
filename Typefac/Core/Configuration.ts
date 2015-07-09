module Typefac.Core {
	export class Configuration {
		public static collectionNamingRules: Typefac.Core.Collections.ICollectionNamingRule[] = [];

		public static initialize = () => {
		    Configuration.collectionNamingRules = [
		        new Typefac.Core.Collections.ArraySuffixCollectionNamingRule(),
		        new Typefac.Core.Collections.CollectionSuffixCollectionNamingRule()
		    ];
		}
	}

	$(() => {
		Configuration.initialize();
	});
}
