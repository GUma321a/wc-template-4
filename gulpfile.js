
const { src, dest, watch, parallel } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const prettier = require('gulp-prettier');
const fileinclude = require('gulp-file-include');
const ftp = require('vinyl-ftp');
const fs = require('fs');
const ftpConfig = JSON.parse(fs.readFileSync('./ftp-settings.json'));
const connect = ftp.create(ftpConfig);


function deploy(){
  return src(["dist/**/*.*"])
    .pipe(connect.newer("www/gumaink.site/projects/wc-template-4/"))
    .pipe(connect.dest("www/gumaink.site/projects/wc-template-4/"));
}

function html(){
  return src(['app/**/*.html', '!app/components/**/*.html', '!app/templates/**/*.html'])
  .pipe(fileinclude())
  .pipe(prettier({
    singleQuote: true,
    printWidth: 3000
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
}

function sass(){
  return src(['app/scss/**/*.scss'])
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 8 versions'],
    browsers: [
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24',
      'Explorer >= 11',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6',
    ],
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream());
}

function cssLibs(){
  return src([
    "node_modules/normalize.css/normalize.css",
    "node_modules/@splidejs/splide/dist/css/splide-core.min.css",
    "node_modules/vlitejs/dist/vlite.css",
  ])
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function js(){
  return src(['app/js/main.js'])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream());
}

function jsLibs(){
  return src([
    "node_modules/@splidejs/splide/dist/js/splide.min.js",
    "node_modules/vlitejs/dist/providers/youtube.js",
    "node_modules/vlitejs/dist/vlite.js",
  ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

function watching(){
  watch(['app/scss/**/*.scss'], sass);
  watch(['app/js/**/*.js'], js);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/**/*.html'], html);
}

function browsersync(){
  browserSync.init({
      server: { baseDir: "dist/" },
      notify: false,
      online: true
  });
}


exports.html = html;
exports.sass = sass;
exports.cssLibs = cssLibs;
exports.watching = watching;
exports.browsersync = browsersync;
exports.js = js;
exports.jsLibs = jsLibs;
exports.deploy = deploy;

exports.default = parallel(html, sass, cssLibs, js, jsLibs, browsersync, watching);