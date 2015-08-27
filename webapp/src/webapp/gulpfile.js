/// <binding Clean='clean' />

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
    webroot: "./" + project.webroot + "/",
    bootstrap: "./lib/bootstrap/",
    site: "./lib/site/"
};

paths.bootstrapJsDest = paths.webroot + "js/bootstrap.min.js";
paths.bootstrapJs = paths.bootstrap + "js/dist/*.js";

paths.bootstrapSassDest = paths.webroot + "css/bootstrap.min.css";
paths.bootstrapSass =  paths.bootstrap + "scss/bootstrap.scss";

paths.siteSassDest = paths.webroot + "css/site.min.css";
paths.siteSass = paths.site + "scss/site.scss";

// site
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("site:js", function (cb) {
    
});

gulp.task("site:sass", function (cb) {
    // clean
    rimraf(paths.siteSassDest, cb);
    // build
    gulp.src(paths.siteSass)
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(rename(paths.siteSassDest))
        .pipe(gulp.dest("."));
});

gulp.task("site", ["site:sass", "site:js"]);

// bootstrap
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("bootstrap:js", function (cb) {
    // clean
    rimraf(paths.bootstrapJsDest, cb);
    // build
    gulp.src(paths.bootstrapJs)
        .pipe(concat(paths.bootstrapJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("bootstrap:sass", function (cb) {
    // clean
    rimraf(paths.bootstrapSassDest, cb);
    // build
    gulp.src(paths.bootstrapSass)
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(rename(paths.bootstrapSassDest))
        .pipe(gulp.dest("."));
});

gulp.task("bootstrap", ["bootstrap:sass", "bootstrap:js"]);


// bindings
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("clean", function () {});


// default
// +++++++++++++++++++++++++++++++++++++++ 

gulp.task("default", [
    "site",
    "bootstrap"
]);