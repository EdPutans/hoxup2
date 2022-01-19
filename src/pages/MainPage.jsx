import { Route } from 'react-router-dom'
import SearchBar from '../components/ChatSearch'
import React from 'react';

import Chat from '../components/Chat'
import SideChatList from '../components/SideChatList'

import UserTag from '../components/UserTag'
import styled from 'styled-components'

function MainPage({ className, ...props }) {
  const { currentUser, setModal } = props;

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

        <SearchBar {...props} />

        <SideChatList {...props} />
      </aside>

      <Route path="/logged-in/:chatId">
        <Chat {...props} />
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
