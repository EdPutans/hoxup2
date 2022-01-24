

declare type Message = {
  userId: number;
  messageText: string;
  conversationId: number;
  id: number;
}

declare type User = {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  avatar: string;
  id: number;
}

declare type Chat = {
  id: number;
  withId: number;
  messages: Message[]
}

declare type ModalType = '' | 'newUser' | 'newChat' | 'settings'

declare type SetModal = (modalType: ModalType) => void

declare type UseMainReturn = {
  chats: Chat[]
  setChats: (chats: Chat[]) => void;

  users: User[]
  setUsers: (users: User[]) => void;

  currentUser: User | null
  setCurrentUser: (newCurrentUser: User) => void;

  modal: ModalType;
  setModal: SetModal;

  talkingWithId: number | null
  setTalkingWithId: (talkingWIth: number) => void;

  search: string
  setSearch: (searchString: string) => void;

  getTalkingWithUser: () => User | null;
  login: (user: User) => void;

  logout: () => void;

  fetchUsers: () => void;

  getOtherUsers: () => User[]

  closeModal: () => void;

  deleteAccount: () => void;

  fetchChats: () => void;

  startChat: () => void;

  clearChats: () => void;

  updateSearch: (searchString: string) => void;

  getFilteredChats: () => Chat[]

}


declare type ClassNameExt = { className: string }