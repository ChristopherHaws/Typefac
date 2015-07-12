module Typefac.Core {
	export class Configuration {
		public static collectionNamingRules: Core.Collections.ICollectionNamingRule[] = [];

		public static initialize = () => {
		    Configuration.collectionNamingRules = [
		        new Core.Collections.ArraySuffixCollectionNamingRule(),
		        new Core.Collections.CollectionSuffixCollectionNamingRule()
		    ];
		}
	}

	$(() => {
		Configuration.initialize();
	});
}
