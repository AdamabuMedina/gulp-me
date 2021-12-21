const { src, dest, watch, series, parallel } = require("gulp");
const fileinclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");


const html = () => {
  return src("./src/html/*.html")
    .pipe(fileinclude())
    .pipe(size({ title: "До сжатия" }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({ title: "После сжатия" }))
    .pipe(dest("./dist"))
}

const wathcer = () => {
  watch("./src/html/**/*.html", html);
}

exports.html = html;
exports.wathcer = wathcer;

exports.dev = series(html, wathcer)