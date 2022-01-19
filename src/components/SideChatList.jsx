import styled from 'styled-components'
import SideChatListItem from './SideChatListItem'
import StartChatButton from './StarChatButton'

function SideChatList({ className, ...props }) {


  return (
    <ul className={className}>
      <li>
        <StartChatButton {...props} />
      </li>
      {props.chats.map(chat => {
        const user = props.users.find(user => user.id === chat.withId)

        return <SideChatListItem key={chat.id} chat={chat} user={user} {...props} />
      })}
    </ul>
  )
}

export default styled(SideChatList)`
  .chat-button {
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid var(--borders);
  }

  .chat-button div {
    display: inline-block;
    padding-left: 1rem;
  }

  .chat-button .user-info {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: start;
    grid-gap: 10px;
  }
`
