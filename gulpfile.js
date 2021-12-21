const { watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();

// Конфигурация
const path = require("./config/path.js")

// Задачи
const clear = require("./task/clear.js")
const html = require("./task/html.js")
const css = require("./task/css.js")

// Сервер
const server = () => {
  browsersync.init({
    server: {
      baseDir: path.root
    }
  })
}

// Наблюдение
const wathcer = () => {
  watch(path.html.watch, html).on("all", browsersync.reload);
  watch(path.css.watch, css).on("all", browsersync.reload);
}

// Задачи
exports.html = html;
exports.css = css;


// Сборка
exports.dev = series(
  clear,
  parallel(html, css),
  parallel(wathcer, server)
)