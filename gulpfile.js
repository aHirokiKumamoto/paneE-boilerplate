/*
  gulpfile.js Copyright(c) 2016 ACCESS CO., LTD.
  All rights are reserved by ACCESS CO., LTD.,
  whether the whole or part of the source code including any modifications.
*/

/* eslint-env node, script */
/* eslint strict: off */
/* eslint no-console: "off" */

'use strict';

var url         = require('url');
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sassLint    = require('gulp-sass-lint');
var csslint     = require('gulp-csslint');
var stylelint   = require('gulp-stylelint');
var eslint      = require('gulp-eslint');
var htmlhint    = require('gulp-htmlhint');
var browserSync = require('browser-sync').create();
var zip         = require('gulp-zip');

var appName   = 'app_name';
var baseDir   = './';
var appDir    = './';
var startHtml = 'index.htm';
var srcFiles  = 'js/**/*.js';
var cssFiles  = './css/*.css';
var sassFile  = './sass/main.scss';
var sassFiles = './sass/**/*.scss';
var genCss    = './css/main.css';
var imgFiles  = 'img/**/*';
var libs      = [];

gulp.task('sass', function() {
  return gulp.src(sassFile)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('lint', ['eslint', 'htmlhint', 'sasslint', 'stylelint']);

gulp.task('eslint', function() {
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('htmlhint', function() {
  return gulp.src(startHtml)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('sasslint', ['sass'], function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sassLint({ configFile: '.sasslintrc' }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('csslint', function() {
  return gulp.src([cssFiles, '!' + genCss])
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('stylelint', ['sass'], function() {
  return gulp.src([sassFiles, cssFiles, '!' + genCss])
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true,
      }],
    }));
});

gulp.task('server', function() {
  browserSync.init({
    logLevel: "debug",
    logSnippet: true,
    files: [srcFiles, startHtml, cssFiles],
    server: {
      localOnly: false,
      baseDir: baseDir,
      index: appDir + startHtml,
      middleware: [
        function(req, res, next) {
          var info = url.parse(req.url, true);
          console.log(info.pathname);
          if (info.pathname === '/log') {
            console.log(info.query.message);
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain');
            res.write('ok');
            res.end();
            return;
          }
          next();
        }]
    },
    startPath: appDir + startHtml
  });
  gulp.watch(srcFiles, ['eslint']);
  gulp.watch(cssFiles, ['csslint', 'stylelint']);
  gulp.watch(sassFiles, ['sasslint', 'stylelint']);
});

gulp.task('package', function () {
  var src = [startHtml, cssFiles, srcFiles, imgFiles, libs];
  src = src.map(function(s) { return appDir + s; });
  process.chdir(baseDir);
  return gulp.src(src, {base: '.'})
    .pipe(zip(appDir + appName + '.zip'))
    .pipe(gulp.dest('./'));
});
