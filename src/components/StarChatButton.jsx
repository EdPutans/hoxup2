import useStore from '../store'

function StartChatButton() {
  const setModal = useStore(store => store.setModal)

  return (
    <button className="chat-button" onClick={() => setModal('newChat')}>
      <div>
        <h3>+ Start a new Chat</h3>
      </div>
    </button>
  )
}

export default StartChatButton
