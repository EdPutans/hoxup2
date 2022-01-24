import { useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate, } from 'react-router-dom'
import Chat from './components/Chat'
import MainWrapper from './components/MainWrapper'
import ModalContainer from './modals/ModalContainer'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import PageNotFound from './pages/PageNotFound'
import useMain from './useMain';

function App() {
  const navigate = useNavigate()

  /** @type {UseMainReturn} */
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
      navigate('/logged-in')
    } else {
      navigate('/login')
    }
    return () => {
      clearChats()
      closeModal()
      clearInterval(intervalId)
    }
    // navigate as a dependency immediately redirects from logged-in/:  id to /logged-in
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, fetchChats, clearChats, closeModal])

  return (
    <MainWrapper>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />

        <Route path="/login" element={<LoginPage {...props} />} />
        <Route path="/logged-in" element={<MainPage {...props} />} />
        <Route path="/logged-in/:chatId" element={
          <Chat {...props} />
        } />


        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <ModalContainer {...props} />
    </MainWrapper>
  )
}



export default App
