import * as http from 'http'
import finalhandler from 'finalhandler'
import serveStatic from 'serve-static'
import path from 'path'

const serve = serveStatic(path.join(__dirname, '..', 'build'))

const server = http.createServer(function (req, res) {
  const done = finalhandler(req, res)
  // @ts-ignore
  serve(req, res, done)
})

const port = 8001

server.listen(port)

console.log(`Frekl web app available at http://localhost:${port}`)
