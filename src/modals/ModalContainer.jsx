import styled from 'styled-components'

import NewChat from './NewChat'
import NewUser from './NewUser'
import Settings from './Settings'
import TestModal from './TestModal'

const modals = {
  '': null,
  newUser: NewUser,
  newChat: NewChat,
  settings: Settings,
  test: TestModal
}

function ModalContainer({ className, ...props }) {
  const Modal = modals[props.modal]


  if (!props.modal) return null

  return (
    <div className={`modal-container ${className}`}>
      <div className="modal">
        <button className="close-modal" onClick={props.closeModal}>
          &times;
        </button>
        <Modal {...props} />
      </div>
    </div>
  )
}

export default styled(ModalContainer)`
  position: absolute;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  display: grid;
  place-content: center;

  background-color: #00000040;

  z-index: 100;

  .modal {
    border-radius: 5px;
    padding: 20px 40px;
    background-color: white;
    position: relative;

    display: grid;
    grid-gap: 5px;
  }

  .close-modal {
    position: absolute;

    top: -10px;
    right: -10px;

    justify-self: end;
    border-radius: 50%;
    border: solid 1px var(--background-stripe);
    background-color: var(--background-stripe);

    width: 40px;
    height: 40px;

    font-size: 1.5rem;
    color: var(--white);

    display: grid;
    place-content: center;
    padding-bottom: 4px;
  }
`
