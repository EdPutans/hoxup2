/**
 * 
 * @param {{message: Message; outgoing: boolean}} props
 */

function Message({ message, outgoing }) {
  return (
    <li className={outgoing ? 'outgoing' : ''}>
      <p>{message.messageText}</p>
    </li>
  )
}

export default Message
