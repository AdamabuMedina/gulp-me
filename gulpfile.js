const { watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();

// Конфигурация
const path = require("./config/path.js")

// Задачи
const clear = require("./task/clear.js")
const html = require("./task/html.js")
const scss = require("./task/scss.js")
const js = require("./task/js.js")
const img = require("./task/img.js")
const font = require("./task/font.js")

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
  watch(path.scss.watch, scss).on("all", browsersync.reload);
  watch(path.js.watch, js).on("all", browsersync.reload);
  watch(path.img.watch, img).on("all", browsersync.reload);
  watch(path.font.watch, font).on("all", browsersync.reload);
}

// Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;


// Сборка
exports.dev = series(
  clear,
  parallel(html, scss, js, img, font),
  parallel(wathcer, server)
)