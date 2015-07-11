/// <binding BeforeBuild='build' />
var gulp = require("gulp");
var tsc = require("gulp-tsc");

gulp.task("build", function () {
	gulp
		.src(["./**/*ts", "./**/*.d.ts", "!./{node_modules,node_modules/**}", "!./{bower_components,bower_components/**}"])
		.pipe(tsc({
			"module": "amd",
			"noImplicitAny": false,
			"noEmitOnError": true,
			"removeComments": false,
			"sourceMap": true,
			"target": "es5",
			"out": "../../artifacts/bin/Typefac/Typefac.js",
			"declaration": true
		}));
});