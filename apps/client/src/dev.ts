import * as udp from 'dgram'

import '../../server/lib'
import '../../web/server'

// creating a client socket
const client = udp.createSocket('udp4')

function send (groupKey?: string, message?: string | number) {
  groupKey = groupKey && groupKey.substring(0, 5000)
  message = typeof message === 'string' ? message.substring(0, 5000) : message

  client.send(Buffer.from(JSON.stringify({ groupKey, message })), 8003, 'localhost', function (error) {
    if (error) {
      console.error(__dirname, error, { groupKey, message })
    }
  })
}

send.close = () => {
  client.close()
}

export default send
