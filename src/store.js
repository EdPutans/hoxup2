import create from 'zustand'
import API from './API'

async function getChatsForUser(userId) {
  let chats = []

  const conversations = await API.getConversations(userId)

  for (const conversation of conversations) {
    const messages = await API.getMessages(conversation.id)

    const otherId =
      conversation.userId !== userId
        ? conversation.userId
        : conversation.participantId

    const chat = {
      id: conversation.id,
      withId: otherId,
      messages
    }

    chats.push(chat)
  }

  return chats
}

const useStore = create((set, get) => ({
  modal: '',
  setModal: modal => set({ modal }),
  closeModal: () => set({ modal: '' }),

  users: [],
  fetchUsers() {
    API.getUsers().then(users => set({ users }))
  },
  getOtherUsers() {
    const { users, currentUser } = get()
    return users.filter(user => user.id !== currentUser?.id)
  },

  currentUser: null,
  login(user) {
    set({ currentUser: user })
  },
  logout() {
    set({ currentUser: null })
  },
  deleteAccount() {
    const { currentUser, logout } = get()
    API.deleteAccount(currentUser.id).then(logout)
  },

  talkingWithId: null,
  setTalkingWithId: id => set({ talkingWithId: id }),
  getTalkingWithUser: () => {
    const { users, talkingWithId } = get()
    return users.find(user => user.id === talkingWithId)
  },

  chats: [],
  fetchChats() {
    getChatsForUser(get().currentUser?.id).then(chats => set({ chats }))
  },
  startChat(participantId) {
    const { currentUser, fetchChats: getChats } = get()

    if (!currentUser) return

    const converstionData = {
      userId: currentUser.id,
      participantId
    }

    API.createConversation(converstionData).then(getChats)
  },
  clearChats() {
    set({ chats: [] })
  },

  search: '',
  updateSearch: newSearch => set({ search: newSearch }),

  getFilteredChats: () => {
    const { chats, search, users } = get()

    if (search === '') return chats

    return chats.filter(chat =>
      chat.messages.some(message => {
        const user = users.find(user => user.id === chat.withId)
        if (!user) return false

        const lowerText = message.messageText.toLowerCase()
        const lowerSearch = search.toLowerCase()
        const userName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`

        return lowerText.includes(lowerSearch) || userName.includes(lowerSearch)
      })
    )
  }
}))

export default useStore
