const baseUrl = 'http://localhost:4000'

const messagesUrl = `${baseUrl}/messages`
const conversationsUrl = `${baseUrl}/conversations`
const usersUrl = `${baseUrl}/users`

function getConversationMessagesUrl(conversationId) {
  return `${messagesUrl}?conversationId=${conversationId}`
}

function getUserConversationsUrl(userId) {
  return `${conversationsUrl}?userId=${userId}`
}

function request(url, options = {}) {
  return fetch(url, options).then(resp => resp.json())
}

function get(url) {
  return request(url)
}

function post(url, data) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function destroy(url) {
  return request(url, { method: 'DELETE' })
}

const API = {
  getMessages(conversationId) {
    return get(getConversationMessagesUrl(conversationId))
  },

  getConversations(userId) {
    return get(getUserConversationsUrl(userId))
  },

  getUsers() {
    return get(usersUrl)
  },

  createUser(userData) {
    return post(usersUrl, userData)
  },

  createConversation(conversationData) {
    return post(conversationsUrl, conversationData)
  },

  createMessage(messageData) {
    return post(messagesUrl, messageData)
  },

  deleteAccount(userId) {
    return destroy(usersUrl + `/${userId}`)
  }
}

export default API
