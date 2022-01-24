import { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import MainPage from '../pages/MainPage'

import Message from './Message'
import MessageBox from './MessageBox'
import UserTag from './UserTag'

function Chat({ className, ...props }) {
  const { chats, currentUser, setTalkingWithId, getTalkingWithUser, chatId } = props

  const chat = chats.find(chat => chat.id === Number(chatId))
  const talkingWithUser = getTalkingWithUser()

  useEffect(() => {
    setTalkingWithId(chat.withId)
  }, [chat.withId, setTalkingWithId])

  // Messages are reversed so that the last one appears at the bottom
  // when using CSS: flex-flow: column-reverse;
  const reversedMessages = chat.messages.slice().reverse()

  if (!talkingWithUser) return null;
  return (
    <main className={className}>
      <header className="panel">
        <UserTag user={talkingWithUser} />
      </header>
      <ul className="conversation__messages">
        {reversedMessages.map(message => (
          <Message
            key={message.id}
            message={message}
            outgoing={message.userId === currentUser.id}
          />
        ))}
      </ul>
      <footer>
        <MessageBox chat={chat} currentUser={currentUser} />
      </footer>
    </main>
  )
}

const ChatWrappedInMain = (props) => {
  const { chatId } = useParams()

  return <MainPage {...props}>
    <Chat {...props} chatId={chatId} />
  </MainPage>
}

export default styled(ChatWrappedInMain)`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: inherit;

  .panel {
    padding: 0 20px;
  }

  .conversation__messages {
    padding: 0 2rem;
    background-color: var(--messages-background);
    background-image: url(/assets/images/whats-messages-bg.png);
    background-blend-mode: soft-light;
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
    flex-flow: column-reverse;
  }

  .conversation__messages li {
    position: relative;
    margin: 0.6rem 0;
    padding: 1rem;
    width: fit-content;
    max-width: 50%;
    background-color: var(--white);
    border-radius: 7.5px;
    border-top-left-radius: 0;
    box-shadow: 0 1px 0.5px rgba(var(--shadow-rgb), 0.13);
  }

  .conversation__messages li::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -8px;
    width: 8px;
    height: 13px;
    background-color: inherit;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }

  .conversation__messages li.outgoing {
    margin-left: auto;
    background-color: var(--message-outgoing);
    border-top-left-radius: 7.5px;
    border-top-right-radius: 0;
  }

  .conversation__messages li.outgoing::after {
    clip-path: polygon(0 0, 100% 0, 0 100%);
    left: inherit;
    right: -8px;
  }

  .conversation__message-box {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`
