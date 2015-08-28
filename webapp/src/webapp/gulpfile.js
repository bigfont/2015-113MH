var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    sass = require('gulp-sass'),
    project = require("./project.json");

// paths
// +++++++++++++++++++++++++++++++++++++++ 

var paths = {
    webroot: "./" + project.webroot + "/"
};

paths.bootstrap = paths.webroot + "lib/bootstrap/";
paths.bootstrapJsDest = paths.webroot + "js/bootstrap.min.js";
paths.bootstrapJs = paths.bootstrap + "js/dist/*.js";
paths.bootstrapSassDest = paths.webroot + "css/bootstrap.min.css";
paths.bootstrapSass = paths.bootstrap + "scss/bootstrap.scss";

paths.site = paths.webroot + "site/";
paths.siteSassDest = paths.webroot + "css/site.min.css";
paths.siteSass = paths.site + "scss/site.scss";

// watch
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("watch:sass", function () {
    gulp.watch(paths.siteSass, ['site:sass']);
    gulp.watch(paths.bootstrapSass, ['bootstrap:sass']);
});

// site
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("site:clean", function (cb) {
    rimraf(paths.siteSassDest, cb);
});

gulp.task("site:js", function () {

});

gulp.task("site:sass", function () {
    gulp.src(paths.siteSass)
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(rename(paths.siteSassDest))
        .pipe(gulp.dest("."));
});

gulp.task("site", ["site:sass", "site:js"]);

// bootstrap
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("bootstrap:clean", function (cb) {
    rimraf(paths.bootstrapJsDest, cb);
});

gulp.task("bootstrap:js", function () {
    gulp.src(paths.bootstrapJs)
        .pipe(concat(paths.bootstrapJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("bootstrap:sass", function () {
    gulp.src(paths.bootstrapSass)
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(rename(paths.bootstrapSassDest))
        .pipe(gulp.dest("."));
});

gulp.task("bootstrap", ["bootstrap:sass", "bootstrap:js"]);

// default
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("default", [
    "site",
    "bootstrap"
]);