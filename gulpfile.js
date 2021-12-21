const { src, dest, watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();

// плагины
const fileinclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");


// Обработка html
const html = () => {
  return src("./src/html/*.html")
    .pipe(fileinclude())
    .pipe(size({ title: "До сжатия" }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({ title: "После сжатия" }))
    .pipe(dest("./dist"))
    .pipe(browsersync.stream())
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


// Сборка
exports.dev = series(
  html,
  parallel(wathcer, server)
)