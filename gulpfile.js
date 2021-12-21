const { src, dest, watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();
const del = require("del");

// плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileinclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");


// Обработка html
const html = () => {
  return src("./src/html/*.html")
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "HTML",
        message: error.message
      }))
    }))
    .pipe(fileinclude())
    .pipe(size({ title: "До сжатия" }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({ title: "После сжатия" }))
    .pipe(dest("./dist"))
    .pipe(browsersync.stream())
}

// Удаление директории
const clear = () => {
  return del("./dist")
}
// Сервер
const server = () => {
  browsersync.init({
    server: {
      baseDir: "./dist"
    }
  })
}


// Наблюдение
const wathcer = () => {
  watch("./src/html/**/*.html", html);
}


// Задачи
exports.html = html;
exports.wathcer = wathcer;
exports.clear = clear;


// Сборка
exports.dev = series(
  clear,
  html,
  parallel(wathcer, server)
)