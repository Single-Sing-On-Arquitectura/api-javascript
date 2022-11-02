const app = require("./server");

function main () {
  app.set('port', process.env.PORT || 3000)
  const port = app.get('port')
  app.listen(port, ()=> {
    console.log('Servidor corriendo en el puerto ', port)
  })
}

main()