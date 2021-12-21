global.$ = {
  // Пакеты
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")(),
  browsersync: require("browser-sync").create(),

  // Конфигурация
  path: require("./config/path.js"),
  app: require("./config/app.js"),
  sass: require("gulp-sass")(require("sass")),
  del: require("del"),
}


// Задачи
const requireDir = require("require-dir")
const task = requireDir("./task", { recurse: true })



// Наблюдение
const wathcer = () => {
  watch($.path.html.watch, task.html).on("all", $.browsersync.reload);
  watch($.path.scss.watch, task.scss).on("all", $.browsersync.reload);
  watch($.path.css.watch, task.css).on("all", $.browsersync.reload);
  watch($.path.js.watch, task.js).on("all", $.browsersync.reload);
  watch($.path.img.watch, task.img).on("all", $.browsersync.reload);
  watch($.path.font.watch, task.font).on("all", $.browsersync.reload);
}

const build = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.html, task.scss, task.js, task.img, task.font)
)

const dev = $.gulp.series(
  build,
  $.gulp.parallel(wathcer, task.server)
)

// Задачи
exports.html = task.html;
exports.scss = task.scss;
exports.css = task.css;
exports.js = task.js;
exports.img = task.img;
exports.font = task.font;
exports.clear = task.clear;


// Сборка prod
exports.default = $.app.isProd ? build : dev;