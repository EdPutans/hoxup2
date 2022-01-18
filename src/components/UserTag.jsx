import styled from 'styled-components'

function UserTag({ user, className }) {
  return (
    <>
      <img
        className={className}
        width="50"
        height="50"
        src={user.avatar}
        alt=""
      />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
    </>
  )
}

export default styled(UserTag)`
  border-radius: 50%;
  background-color: var(--white);
  border: 1px solid var(--borders);
`
