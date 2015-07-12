﻿/// <reference path="exception.ts" />

module Typefac {
	export class DependencyResolutionException extends Exception {
		constructor(message: string) {
			super(message);
		}
	}
}