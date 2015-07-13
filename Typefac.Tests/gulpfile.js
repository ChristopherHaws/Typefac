/// <binding AfterBuild='default' />
var gulp = require("gulp");
var tsc = require("gulp-tsc");

gulp.task("default", function () {

	gulp
		.src("../dist/*.*")
		.pipe(gulp.dest("./wwwroot/libs/"));

	gulp
		.src(["./Tests/**/*.ts", "./libs/**/*.d.ts", "./wwwroot/libs/Typefac.d.ts"])
		.pipe(tsc({
			"module": "amd",
			"noImplicitAny": false,
			"noEmitOnError": true,
			"removeComments": false,
			"sourceMap": true,
			"target": "es5",
			"out": "../wwwroot/Tests.js"
		}));
});