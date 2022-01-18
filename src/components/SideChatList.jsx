import styled from 'styled-components'
import useStore from '../store'
import SideChatListItem from './SideChatListItem'
import StartChatButton from './StarChatButton'

function SideChatList({ className }) {
  const chats = useStore(store => store.getFilteredChats())
  const users = useStore(store => store.users)

  return (
    <ul className={className}>
      <li>
        <StartChatButton />
      </li>
      {chats.map(chat => {
        const user = users.find(user => user.id === chat.withId)

        return <SideChatListItem key={chat.id} chat={chat} user={user} />
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
