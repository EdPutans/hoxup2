import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import UserTag from './UserTag'

function SideChatListItem({ className, ...props }) {
  const { user, chat, talkingWithId } = props;
  const history = useHistory()

  const lastMessage =
    chat.messages[chat.messages.length - 1]?.messageText ?? 'No messages'

  if (!user?.id) return null

  return (
    <li
      key={user.id}
      className={`${className} ${talkingWithId === user.id ? 'selected' : ''}`}
    >
      <button
        className="chat-button"
        onClick={() => history.push(`/logged-in/${chat.id}`)}
      >
        <div className="user-info">
          <UserTag user={user} />
        </div>
        <p className="last-message">{lastMessage}</p>
      </button>
    </li>
  )
}

export default styled(SideChatListItem)`
  &:hover {
    background-color: #00000010;
  }

  &.selected {
    background-color: #00968860;
  }

  .last-message {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
