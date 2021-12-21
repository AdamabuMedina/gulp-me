const { src, dest } = require("gulp");

// Плагины
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const gcmq = require("gulp-group-css-media-queries");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpcss = require("gulp-webp-css")


// Конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")


// Обработка CSS
const css = () => {
  return src(path.css.src, { sourcemaps: true })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "CSS",
        message: error.message
      }))
    }))
    .pipe(concat("main.css"))
    .pipe(cssimport())
    .pipe(webpcss())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(size({ title: "main.css" }))
    .pipe(dest(path.css.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "main.min.css" }))
    .pipe(dest(path.css.dest, { sourcemaps: true }))
}

module.exports = css;