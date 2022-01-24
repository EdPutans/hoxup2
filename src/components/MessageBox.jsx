import { useEffect, useRef } from 'react'
import API from '../API'

function MessageBox({ chat, currentUser }) {

  /** @type {import('react').RefObject<HTMLInputElement>} */
  const messageRef = useRef()

  useEffect(() => {
    messageRef.current.focus()
  }, [chat.id])

  const handleSubmit = e => {
    e.preventDefault()

    const message = {
      userId: currentUser.id,
      messageText: e.target.message.value,
      conversationId: chat.id
    }

    API.createMessage(message)

    e.target.reset()
  }

  return (
    <form className="panel conversation__message-box" onSubmit={handleSubmit}>
      <input
        ref={messageRef}
        required
        name="message"
        type="text"
        placeholder="Type a message"
        autoComplete="off"
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
          ></path>
        </svg>
      </button>
    </form>
  )
}

export default MessageBox
