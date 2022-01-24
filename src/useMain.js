import API from './API'
import React from 'react'

/**
 * 
 * @param {number} userId
 * @returns {Promise<Chat[]>}
 */
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

/**
 * 
 * @returns {UseMainReturn}
 */
const useMain = () => {
  const [chats, setChats] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  const [modal, setModal] = React.useState("");

  const [talkingWithId, setTalkingWithId] = React.useState(null)
  const [search, setSearch] = React.useState(null)

  const login = React.useCallback((userParam) => {
    setCurrentUser(userParam)
  }, [setCurrentUser])

  const logout = React.useCallback(() => {
    setCurrentUser(null)
  }, [setCurrentUser])

  const fetchUsers = React.useCallback(() => {
    API.getUsers().then(users => setUsers(users))
  }, [setUsers])

  const getOtherUsers = React.useCallback(() => {
    return users.filter(user => user.id !== currentUser?.id)
  }, [users, currentUser])

  const closeModal = React.useCallback(() => {
    setModal('')
  }, [setModal])

  const deleteAccount = React.useCallback(() => {
    API.deleteAccount(currentUser.id).then(logout)
  }, [currentUser, logout])

  const fetchChats = React.useCallback(() => {
    getChatsForUser(currentUser?.id).then(chats => setChats(chats))
  }, [currentUser, setChats])

  const startChat = React.useCallback((participantId) => {

    if (!currentUser) return

    const converstionData = {
      userId: currentUser.id,
      participantId
    }

    API.createConversation(converstionData).then(fetchChats)
  }, [currentUser, fetchChats])

  const clearChats = React.useCallback(() => {
    setChats([])
  }, [setChats])

  const updateSearch = React.useCallback((newSearch) => {
    return setSearch(newSearch)
  }, [setSearch])

  const getFilteredChats = React.useCallback(() => {
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
  }, [search, chats, users])

  const getTalkingWithUser = React.useCallback(() => {
    return users.find(user => user.id === talkingWithId)
  }, [users, talkingWithId])

  return {
    chats, setChats,
    users, setUsers,
    currentUser,
    setCurrentUser,
    modal,
    setModal,
    talkingWithId,
    setTalkingWithId,
    search,
    setSearch,
    getTalkingWithUser,
    login,
    logout,
    fetchUsers,
    getOtherUsers,
    closeModal,
    deleteAccount,
    fetchChats,
    startChat,
    clearChats,
    updateSearch,
    getFilteredChats,
  }
}


export default useMain;