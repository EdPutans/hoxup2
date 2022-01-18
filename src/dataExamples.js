export const USER_EXAMPLE = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+44777777777',
  avatar: 'https://robohash.org/1'
}

export const CONVERSATION_EXAMPLE = {
  id: 1,
  userId: 1,
  participantId: 2
}

export const MESSAGE_EXAMPLE = {
  id: 2,
  messageText: 'Lorem ipsum...',
  userId: 1,
  conversationId: 1
}

export const CHAT_EXAMPLE = {
  id: 1,
  withId: 2,
  messages: [MESSAGE_EXAMPLE]
}
