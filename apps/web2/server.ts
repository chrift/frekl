import * as http from 'http'
import finalhandler from 'finalhandler'
import serveStatic from 'serve-static'

const serve = serveStatic('./build')

const server = http.createServer(function (req, res) {
  const done = finalhandler(req, res)
  // @ts-ignore
  serve(req, res, done)
})

server.listen(8001)
