const { src, dest } = require("gulp");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");


// Конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")


// Обработка IMG
const img = () => {
  return src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "IMG",
        message: error.message
      }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.img.dest))
}

module.exports = img;