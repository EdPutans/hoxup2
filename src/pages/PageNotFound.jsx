import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

function PageNotFound({ className }) {
  const [count, setCount] = useState(5)

  const history = useHistory()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => count - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [history])

  useEffect(() => {
    if (count < 1) history.push('/logged-in')
  }, [count, history])

  return (
    <div className={`main-wrapper ${className}`}>
      <div>
        <h1>Page not found</h1>
        <h2>Taking you back in {count}</h2>
        <img
          src="https://avatars.dicebear.com/api/avataaars/oooooooooo.svg"
          alt=""
        />
      </div>
    </div>
  )
}

export default styled(PageNotFound)`
  display: grid;
  place-content: center;
  grid-template-columns: initial;
  position: initial;
  text-align: center;
`
