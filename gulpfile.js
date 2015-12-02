var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');

gulp.task('compile-app', function() {
  return gulp.src("./src/app/**/*.es")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat("app.js"))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./build"));
});

gulp.task('compile-server', function() {
  return gulp.src("./src/server/**/*.es")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat("server.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./build"));
});

gulp.task('watch', function () {
  gulp.watch("./src/server/**/*", ['compile-server']);
  gulp.watch("./src/app/**/*", ['compile-app']);
});

gulp.task('default', ['compile-server', 'compile-app', 'watch']);

