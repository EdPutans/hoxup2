import styled from 'styled-components'
import API from '../API'

function NewUser({ className, ...props }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formEl = event.target

    const newUserData = {
      firstName: formEl.firstName.value,
      lastName: formEl.lastName.value,
      phoneNumber: formEl.phoneNumber.value,
      avatar: `https://avatars.dicebear.com/api/avataaars/${formEl.firstName.value}${formEl.lastName.value}.svg`
    }

    API.createUser(newUserData).then(props.fetchUsers).then(props.closeModal)
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <h2 className="modal-title">Enter your details</h2>
        <label htmlFor="firstName">
          <h3>First name</h3>
        </label>
        <input required type="text" name="firstName" id="firstName" />

        <label htmlFor="lastName">
          <h3>Last name</h3>
        </label>
        <input required type="text" name="lastName" id="lastName" />

        <label htmlFor="phoneNumber">
          <h3>Phone number</h3>
        </label>
        <input required type="text" name="phoneNumber" id="phoneNumber" />

        <button className="create-user">CREATE USER</button>
      </form>
    </div>
  )
}

export default styled(NewUser)`
  form {
    display: grid;
    grid-gap: 5px;
  }

  .modal-title {
    text-align: center;
  }

  input {
    border: solid 1px black;
  }

  .create-user {
    text-align: center;
    justify-self: center;

    padding: 0.5rem 1rem;

    font-weight: 500;
    letter-spacing: 0.1rem;
    color: var(--white);

    background-color: var(--background-stripe);
    border-radius: 3px;
  }
`
