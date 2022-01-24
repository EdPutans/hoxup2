import SearchBar from '../components/ChatSearch'
import React from 'react';

import SideChatList from '../components/SideChatList'

import UserTag from '../components/UserTag'
import styled from 'styled-components'

function MainPage(props) {

  /** @type {UseMainReturn & {children: JSX.Element}} */
  const { currentUser, setModal, children } = props;

  if (!currentUser) return null

  return (
    <div className={`main-wrapper ${props.className}`}>
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

      {children}
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
