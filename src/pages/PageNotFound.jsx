import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

/**
 * @param {{className: string}} props  
 */
function PageNotFound(props) {
  const [count, setCount] = useState(5)

  const navigate = useNavigate()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => count - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [navigate])

  useEffect(() => {
    if (count < 1) navigate('/logged-in')
  }, [count, navigate])

  return (
    <div className={`main-wrapper ${props.className}`}>
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
