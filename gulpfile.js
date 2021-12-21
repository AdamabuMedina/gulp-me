const { watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();

// Конфигурация
const path = require("./config/path.js")

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
}


// Задачи
const clear = require("./task/clear.js")
const html = require("./task/html.js")


// Сборка
exports.dev = series(
  clear,
  html,
  parallel(wathcer, server)
)