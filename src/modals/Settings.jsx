import styled from 'styled-components'
import useStore from '../store'

function Settings({ className }) {
  const logout = useStore(store => store.logout)
  const deleteAccount = useStore(store => store.deleteAccount)

  return (
    <div className={className}>
      <h2>Settings</h2>
      <button className="log-out" onClick={logout}>
        LOG OUT
      </button>
      <button
        className="delete-account"
        onClick={() => {
          let agreed = window.confirm('Are you sure? This cannot be undone.')
          if (agreed) deleteAccount()
        }}
      >
        DELETE ACCOUNT
      </button>
    </div>
  )
}

export default styled(Settings)`
  display: grid;
  grid-gap: 10px;

  .delete-account {
    color: var(--warning);
  }
`
