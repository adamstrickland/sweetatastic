var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var jest = require('gulp-jest');

var babelOpts = { presets: ['es2015'] };

var srcDir = "./src";
var specDir = "./spec";
var testDir = "./__tests__";
var splat = "/**/*";
var supportDir = specDir + "/support";
var appPath = "/app";
var appSplat = appPath + splat;
var appSrc = srcDir + appSplat;
var appSpec = specDir + appSplat;
var srvPath = "/srv";
var srvSplat = srvPath + splat;
var srvSrc = srcDir + srvSplat;
var srvSpec = specDir + srvSplat;
var distDir = "./dist";
var buildDir = "./build";
var appBuildDir = buildDir + appPath;
var srvBuildDir = buildDir + srvPath;

gulp.task('spec-app', ['compile-app'], function () {
  return gulp.src(appSpec + ".es")
    .pipe(babel(babelOpts))
    .pipe(gulp.dest(testDir))
    .pipe(jest({
      scriptPreprocessor:         supportDir + "/preprocessor.js",
      unmockedModulePathPatterns: [ "node_modules/react" ],
      testDirectoryName:          specDir,
      testPathIgnorePatterns:     [ "node_modules", supportDir ],
      moduleFileExtensions:       [ "js", "json", "react" ]
    }));
});

gulp.task('compile-app', function() {
  return gulp.src(appSrc + ".es")
    .pipe(babel(babelOpts))
    .pipe(gulp.dest(appBuildDir));
});

gulp.task('dist-app', ['compile-app'], function () {
  return gulp.src(appBuildDir + splat)
    .pipe(sourcemaps.init())
    .pipe(concat("application.js"))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distDir));
});

gulp.task('spec-srv', ['compile-srv'], function () {
  return gulp.src(srvSpec + ".es")
    .pipe(babel(babelOpts))
    .pipe(gulp.dest(testDir))
    .pipe(jest({
      scriptPreprocessor:         supportDir + "/preprocessor.js",
      unmockedModulePathPatterns: [ "node_modules/react" ],
      testDirectoryName:          specDir,
      testPathIgnorePatterns:     [ "node_modules", supportDir ],
      moduleFileExtensions:       [ "js", "json", "react" ]
    }));
});

gulp.task('compile-srv', function() {
  return gulp.src(srvSrc + ".es")
    .pipe(babel(babelOpts))
    .pipe(gulp.dest(srvBuildDir));
});

gulp.task('dist-srv', ['compile-srv'], function () {
  return gulp.src(srvBuildDir + splat)
    .pipe(sourcemaps.init())
    .pipe(concat("server.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distDir));
});

gulp.task('watch', function () {
  var srvTasks = ['compile-srv', 'spec-srv']
  var appTasks = ['compile-app', 'spec-app']

  gulp.watch(srvSrc, ['spec-srv']);
  gulp.watch(srvSpec, ['spec-srv']);
  gulp.watch(appSrc, ['spec-app']);
  gulp.watch(appSpec, ['spec-app']);
});

gulp.task('compile', ['compile-srv', 'compile-app']);
gulp.task('spec', ['spec-app', 'spec-srv']);
gulp.task('dist', ['dist-app', 'dist-srv']);
gulp.task('build', ['compile', 'spec', 'dist']);

gulp.task('default', ['build', 'watch']);

