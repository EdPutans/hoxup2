import styled from 'styled-components'

import UserTag from '../components/UserTag'

function NewChat({ className, ...props }) {
  const { chats, users, startChat, closeModal } = props

  const usersImNotChattingWith = users.filter(
    user => !chats.some(chat => chat.withId === user.id)
  )
  console.log({ usersImNotChattingWith })

  return (
    <div className={`new-chat ${className}`}>
      <h2>Pick a user to talk to</h2>
      {usersImNotChattingWith.map(user => {
        try {
          return <button
            key={user.id}
            className="start-chat"
            onClick={() => {
              startChat(user.id)
              closeModal()
            }}
          >
            <UserTag user={user} />
          </button>
        } catch {
          return <p>I BROKE</p>
        }

      }


      )}
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
