import * as udp from 'dgram'

import '../../server/lib'

// creating a client socket
const client = udp.createSocket('udp4')

function send (groupKey: string, message?: string | number) {
  client.send(Buffer.from(JSON.stringify({ groupKey, message })), 2222, 'localhost', function (error) {
    if (error) {
      console.error(error)
    }
  })
}

send.close = () => {
  client.close()
}

export default send
