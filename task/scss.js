const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

// плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const gcmq = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const webpcss = require("gulp-webp-css")


// Обработка SCSS
const scss = () => {
  return src(path.scss.src, { sourcemaps: true })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "SCSS",
        message: error.message
      }))
    }))
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(webpcss())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(size({ title: "main.css" }))
    .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "main.min.css" }))
    .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
}

module.exports = scss;