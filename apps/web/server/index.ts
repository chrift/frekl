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
// @ts-ignore
// import StaticServer from 'static-server'
//
// // var StaticServer = require('static-server');
// const server = new StaticServer({
//   rootPath: '../build',            // required, the root of the server file tree
//   port: 1337,               // required, the port to listen
//   // name: 'my-http-server',   // optional, will set "X-Powered-by" HTTP header
//   // host: '10.0.0.100',       // optional, defaults to any interface
//   // cors: '*',                // optional, defaults to undefined
//   // followSymlink: true,      // optional, defaults to a 404 error
//   // templates: {
//   //   index: 'foo.html',      // optional, defaults to 'index.html'
//   //   notFound: '404.html'    // optional, defaults to undefined
//   // }
// })
//
// server.start(function () {
//   console.log('Frekl web app available at', server.port)
// })

// server.on('request', function (req, res) {
// req.path is the URL resource (file name) from server.rootPath
// req.elapsedTime returns a string of the request's elapsed time
// })

// server.on('symbolicLink', function (link, file) {
// link is the source of the reference
// file is the link reference
// console.log('File', link, 'is a link to', file)
// })

// server.on('response', function (req, res, err, file, stat) {
// res.status is the response status sent to the client
// res.headers are the headers sent
// err is any error message thrown
// file the file being served (may be null)
// stat the stat of the file being served (is null if file is null)

// NOTE: the response has already been sent at this point
// })
