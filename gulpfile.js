const { src, dest } = require("gulp");
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

exports.html = html