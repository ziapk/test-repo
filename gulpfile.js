var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    bytediff = require('gulp-bytediff'),
    connect = require('gulp-connect'),

    cssnanoOptions = {
      zindex: false,
      colormin: false,
      discardUnused: false,
      reduceIdents: false
    },
    cleanCSSOptions = {
      advanced: false
    };


gulp.task('task-cssnano', function () {
  return gulp.src(['./assets/src/css/*.css', '!./assets/src/css/*.min.css'])
    /* rename with '.min' suffix */
    .pipe(rename({suffix: '.min'}))
    /* start byte size calculation*/
    .pipe(bytediff.start())
    /* minify CSS with options */
    .pipe(cssnano(cssnanoOptions))
    /* stop byte size calculation and log result */
    .pipe(bytediff.stop())
    /* write sourcemaps */
    .pipe(sourcemaps.write('./'))
    /* write minified CSS */
    .pipe(gulp.dest('./assets/css/'))
    /* reload server once complete */
    .pipe(connect.reload());
});
gulp.task('img-min', function () {
  return gulp
    .src('./assets/src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/images/'))
});

gulp.task('min-js', function() {
    gulp.src(['./assets/src/js/*.js', '!./assets/src/js/*.min.js'])
   .pipe(rename({dirname: ''}))
   .pipe(gulp.dest('./assets/js'))
   .pipe(uglify())
   .pipe(rename({suffix: '.min'}))
   .pipe(gulp.dest('./assets/js'));
});

gulp.task('default', ['task-cssnano', 'img-min', 'min-js']);
