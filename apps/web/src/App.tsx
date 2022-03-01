import { useCallback, useEffect, useState } from 'react'

interface UPCDashMessage {
  groupKey: string
  message: string
}

const maxGroupLength = 100

export default function Web () {
  const [messages, setMessages] = useState<Record<string, string[]>>({})
  const [ws, setWs] = useState<WebSocket|null>()


  const addMessage = useCallback((jsonMessage) => {
    let parsedMessage: UPCDashMessage

    try {
      parsedMessage = JSON.parse(jsonMessage)
    } catch (e) {
      parsedMessage = {
        groupKey: 'Ungrouped',
        message: String(jsonMessage)
      }
    }

    setMessages(messages => {
      const group = [...messages[parsedMessage.groupKey] || []]

      group.push(`${(new Date()).toLocaleString()} - ${parsedMessage.message}`)

      if (group.length > maxGroupLength) {
        group.splice(0, group.length - maxGroupLength)
      }

      return {
        ...messages,
        [parsedMessage.groupKey]: group
      }
    })
  }, [])

  const connectWs = useCallback(() => {
    if (ws) {
      return
    }

    addMessage('Connecting to websocket...')

    const socketConnection = new WebSocket(`ws://localhost:8080`)

    socketConnection.onerror = function () {
      addMessage('WebSocket error')
    }
    socketConnection.onopen = function () {
      addMessage('WebSocket connection established')
    }
    socketConnection.onclose = function () {
      addMessage('WebSocket connection closed')
      setWs(null)

      setTimeout(connectWs, 1000)
    }
    socketConnection.onmessage = function (msg) {
      msg.data.text().then(addMessage)
    }

    setWs(socketConnection)
  }, [addMessage, ws])

  useEffect(() => {
    connectWs()

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [])

  return (
    <div>
      {Object.keys(messages).map(groupKey => {
        const groupMessages = messages[groupKey]

        return <div key={groupKey} style={{ float: 'left', background: '#eee', border: '1px solid black', padding: '20px' }}>
          <h2>{groupKey}</h2>
          <div style={{ maxHeight: `80vh`, overflow: 'scroll' }}>
            <table>
              <tbody>
              {groupMessages.map((message, index) => <tr key={`${groupKey} - ${index}`}>
                <td>{message}</td>
              </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      })}
    </div>
  )
}
