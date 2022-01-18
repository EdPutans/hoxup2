import styled from 'styled-components'

const MainWrapper = styled.div`
  .main-wrapper {
    display: grid;
    position: relative;
    grid-template-columns: 250px 2fr;
    height: 100vh;
    max-width: 1440px;
    margin: 0 auto;
    z-index: 10;
    background-color: var(--white);
    box-shadow: var(--main-shadow);
  }

  @media screen and (min-width: 1440px) {
    .main-wrapper {
      height: 95vh;
    }
  }
`

export default MainWrapper
