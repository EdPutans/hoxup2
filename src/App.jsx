import { useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import MainWrapper from './components/MainWrapper'
import ModalContainer from './modals/ModalContainer'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import PageNotFound from './pages/PageNotFound'
import useMain from './pages/useMain';

function App() {
  const history = useHistory()
  const props = useMain();
  const { currentUser, fetchChats, clearChats, closeModal } = props;
  const { fetchUsers } = props;

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    let intervalId

    if (currentUser) {
      fetchChats()
      intervalId = setInterval(fetchChats, 2000)
      history.push('/logged-in')
    } else {
      history.push('/login')
    }
    return () => {
      clearChats()
      closeModal()
      clearInterval(intervalId)
    }
  }, [currentUser, fetchChats, history, clearChats, closeModal])

  return (
    <MainWrapper>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <LoginPage {...props} />
        </Route>
        <Route path="/logged-in">
          <MainPage
            {...props}
          />
        </Route>
        <Route>
          <PageNotFound {...props} />
        </Route>
      </Switch>

      <ModalContainer {...props} />
    </MainWrapper>
  )
}

export default App
