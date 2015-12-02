var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('compile', function() {
  return gulp.src("./src/**/*.es")
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(concat("server.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./build"));
});

gulp.task('watch', function () {
  gulp.watch("./src/**/*", ['compile']);
});

gulp.task('default', ['compile', 'watch']);

