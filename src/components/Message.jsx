function Message({ message, outgoing }) {
  return (
    <li className={outgoing ? 'outgoing' : ''}>
      <p>{message.messageText}</p>
    </li>
  )
}

export default Message
