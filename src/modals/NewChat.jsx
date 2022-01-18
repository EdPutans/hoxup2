import styled from 'styled-components'

import UserTag from '../components/UserTag'
import useStore from '../store'

function NewChat({ className }) {
  const users = useStore(store => store.getOtherUsers())
  const chats = useStore(store => store.chats)
  const closeModal = useStore(store => store.closeModal)
  const startChat = useStore(store => store.startChat)

  const usersImNotChattingWith = users.filter(
    user => !chats.some(chat => chat.withId === user.id)
  )

  return (
    <div className={`new-chat ${className}`}>
      <h2>Pick a user to talk to</h2>
      {usersImNotChattingWith.map(user => (
        <button
          key={user.id}
          className="start-chat"
          onClick={() => {
            startChat(user.id)
            closeModal()
          }}
        >
          <UserTag user={user} />
        </button>
      ))}
      {usersImNotChattingWith.length === 0 && <h3>No users available</h3>}
    </div>
  )
}

export default styled(NewChat)`
  display: grid;
  grid-gap: 10px;

  .start-chat {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: start;
    border-radius: 5px;
  }
`
