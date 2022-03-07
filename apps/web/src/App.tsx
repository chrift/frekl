import './App.scss'
import { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

interface UPCDashMessage {
  groupKey: string
  message: string
}

const maxGroupLength = 100

let time = new Date()

setInterval(() => {
  time = new Date()
}, 1000)

export default function Web () {
  const [messages, setMessages] = useState<Record<string, string[]>>({})
  const [ws, setWs] = useState<WebSocket | null>()
  // const [time, setTime] = useState(new Date())

  const addMessage = useCallback((jsonMessage: string | UPCDashMessage) => {
    let parsedMessage: UPCDashMessage

    if (typeof jsonMessage === 'object') {
      parsedMessage = jsonMessage
    } else {
      parsedMessage = {
        groupKey: 'Ungrouped',
        message: String(jsonMessage)
      }
    }

    setMessages(messages => {
      const group = [...messages[parsedMessage.groupKey] || []]

      group.push(`${time.toLocaleString()} - ${parsedMessage.message}`)

      if (group.length > maxGroupLength) {
        group.splice(0, group.length - maxGroupLength)
      }

      return {
        ...messages,
        [parsedMessage.groupKey]: group
      }
    })
  }, [])

  const clearGroupMessages = useCallback((groupKey: string) => {
    setMessages(messages => {
      return {
        ...messages,
        [groupKey]: []
      }
    })
  }, [])

  const removeGroup = useCallback((groupKey: string) => {
    setMessages(messages => {
      // https://ultimatecourses.com/blog/remove-object-properties-destructuring
      const { [groupKey]: remove, ...rest } = messages

      return {
        ...rest
      }
    })
  }, [])

  const connectWs = useCallback(() => {
    if (ws) {
      return
    }

    addMessage('Connecting to websocket...')

    const socketConnection = new WebSocket(`ws://localhost:8002`)

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
    socketConnection.onmessage = function (msgJson) {
      // console.log(msg.data)

      // msg.data.then((msgJson: string) => {
      try {
        const parsedMsgs = JSON.parse(msgJson.data)

        for (const msg of parsedMsgs) {
          addMessage(msg)
        }
      } catch (e) {
      }
      // })
    }

    setWs(socketConnection)
  }, [addMessage, ws])

  useEffect(() => {
    connectWs()

    return () => {
      // clearInterval(timeInterval)

      if (ws) {
        ws.close()
      }
    }
  }, [])

  return (
    <Row xs={2} md={6} className="g-1">
      {Object.keys(messages).map(groupKey => {
        const groupMessages = messages[groupKey]

        return <Col key={groupKey}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Button size="sm" variant="outline-danger" onClick={() => removeGroup(groupKey)}>&times;</Button>
                {' '}{groupKey}{' '}
                <Button size="sm" variant="outline-primary" onClick={() => clearGroupMessages(groupKey)}>Clear</Button>
              </Card.Title>
              <div style={{ maxHeight: `80vh`, overflow: 'scroll' }}>
                <Table striped>
                  <tbody>
                  {groupMessages.map((message, index) => <tr key={`${groupKey} - ${index}`}>
                    <td>{message}</td>
                  </tr>)}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      })}
    </Row>
  )
}
