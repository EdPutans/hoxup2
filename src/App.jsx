import { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import MainWrapper from './components/MainWrapper'
import ModalContainer from './modals/ModalContainer'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import PageNotFound from './pages/PageNotFound'
import useStore from './store'

function App() {
  const fetchUsers = useStore(store => store.fetchUsers)
  const fetchChats = useStore(store => store.fetchChats)
  const clearChats = useStore(store => store.clearChats)
  const closeModal = useStore(store => store.closeModal)
  const currentUser = useStore(store => store.currentUser)
  const history = useHistory()

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
          <LoginPage />
        </Route>
        <Route path="/logged-in">
          <MainPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>

      <ModalContainer />
    </MainWrapper>
  )
}

export default App
