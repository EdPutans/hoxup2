import { Route } from 'react-router-dom'
import SearchBar from '../components/ChatSearch'

import Chat from '../components/Chat'
import SideChatList from '../components/SideChatList'
import useStore from '../store'
import UserTag from '../components/UserTag'
import styled from 'styled-components'

function MainPage({ className }) {
  const currentUser = useStore(store => store.currentUser)
  const setModal = useStore(store => store.setModal)

  if (!currentUser) return null

  return (
    <div className={`main-wrapper ${className}`}>
      <aside>
        <header className="panel">
          <UserTag user={currentUser} />
          <button
            className="open-settings"
            onClick={() => setModal('settings')}
          >
            <span role="img" aria-label="settings">
              ⚙️
            </span>
          </button>
        </header>

        <SearchBar />

        <SideChatList />
      </aside>

      <Route path="/logged-in/:chatId">
        <Chat />
      </Route>
    </div>
  )
}

export default styled(MainPage)`
  .panel {
    min-height: 4rem;
    padding: 0.5rem;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    background-color: var(--panels-background);
    border-left: 1px solid var(--borders);
  }

  .panel h3 {
    margin-left: 1rem;
  }

  .open-settings {
    font-size: 1.5rem;
  }
`
