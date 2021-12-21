// Сервер
const server = () => {
  $.browsersync.init({
    server: {
      baseDir: $.path.root
    }
  })
}

module.exports = server