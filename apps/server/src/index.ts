import * as udp from 'dgram'

import WebSocket, { WebSocketServer } from 'ws'

const msgQueue: string[] = []

const wss = new WebSocketServer({ port: 8002 })
let socket: WebSocket

wss.on('connection', function connection (ws) {
  console.log('Frekl websocket client connected')
  socket = ws
  // ws.on('message', function message (data) {
  //   console.log('received: %s', data)
  // })
  //
  // ws.send('something')

  setInterval(() => {
    if (msgQueue.length) {
      send(msgQueue.splice(0, msgQueue.length))
    }
  }, 500)
})

wss.on('error', (e) => {
  console.error(e)
})

wss.on('listening', function(){
  console.log(`Frekl websocket available at ${JSON.stringify(wss.address())}`)
})

const send = (msg: string[]) => {
  if (socket) {
    socket.send(JSON.stringify(msg))
  }
}

// --------------------creating a udp server --------------------

// creating a udp server
const server = udp.createSocket('udp4')

// emits when any error occurs
server.on('error', function (error) {
  console.log('Error: ' + error)
  // server.close()
})

const maxQueueLength = 500
const maxGroupLength = 100

// emits on new datagram msg
server.on('message', function (msg, info) {
  try {
    msgQueue.push(JSON.parse(msg.toString()))

    // @todo restrict size by group
    if (msgQueue.length > maxQueueLength) {
      msgQueue.splice(0, maxQueueLength)
    }
  } catch (e) {
    console.error(e)
  }
})

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
  const address = server.address()
  const port = address.port
  const ipaddr = address.address
  console.log(`Frekl udp server available at http://${ipaddr}:${port}`)
})

//emits after the socket is closed using socket.close();
server.on('close', function () {
  console.log('Socket is closed!')
})

server.bind(8003)
