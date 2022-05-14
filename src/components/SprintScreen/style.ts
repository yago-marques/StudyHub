import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  .loader {
    height: 8rem;
    width: 8rem;
    border: 5px solid transparent;
    border-bottom-color: var(--yellow);
    border-radius: 50%;
    animation: rotateLoaderLogin 0.5s linear infinite;
  }
  @keyframes rotateLoaderLogin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`