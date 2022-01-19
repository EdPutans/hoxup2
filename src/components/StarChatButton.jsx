

function StartChatButton({ setModal }) {

  return (
    <button className="chat-button" onClick={() => setModal('newChat')}>
      <div>
        <h3>+ Start a new Chat</h3>
      </div>
    </button>
  )
}

export default StartChatButton
