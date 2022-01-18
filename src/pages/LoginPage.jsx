import { useEffect } from "react";
import styled from "styled-components";
import UserTag from "../components/UserTag";
import useStore from "../store";

function LoginPage({ className }) {
  const users = useStore((store) => store.users);
  const login = useStore((store) => store.login);
  const setModal = useStore((store) => store.setModal);
  const fetchUsers = useStore((store) => store.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={`main-wrapper ${className}`}>
      <section className="login-section">
        <h2>Choose your user!</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => {
                  login(user);
                }}
                className="user-selection"
              >
                <UserTag user={user} />
              </button>
            </li>
          ))}

          <li>
            <button
              className="user-selection"
              onClick={() => setModal("newUser")}
            >
              <h3>+ Add a new user</h3>
            </button>
          </li>
          {/* <li>
            <button onClick={() => setModal('test')}>SEE TEST MODAL</button>
          </li> */}
        </ul>
      </section>
    </div>
  );
}

export default styled(LoginPage)`
  &.main-wrapper {
    grid-template-columns: minmax(300px, 600px);
    place-content: center;
    background-color: transparent;
    box-shadow: none;
  }

  .login-section {
    background-color: var(--white);
    padding: 1rem;
    box-shadow: var(--main-shadow);
  }

  .login-section h2 {
    margin: 1rem 0 1.5rem;
  }

  .login-section li {
    border-top: 1px solid var(--borders);
    padding: 0.5rem 0;
  }

  .login-section li:hover {
    background-color: var(--panels-hover);
  }

  .user-selection {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: left;
    gap: 2rem;
  }
`;
