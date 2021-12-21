const babel = require("gulp-babel");
const webpack = require("webpack-stream");

// Конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")


// Обработка JavaScript
const js = () => {
  return $.gulp.src($.path.js.src, { sourcemaps: $.app.isDev })
    .pipe($.gp.plumber({
      errorHandler: $.gp.notify.onError(error => ({
        title: "JavaScript",
        message: error.message
      }))
    }))
    .pipe(babel())
    .pipe(webpack($.app.webpack))
    .pipe($.gulp.dest($.path.js.dest, { sourcemaps: $.app.isDev }))
}

module.exports = js;