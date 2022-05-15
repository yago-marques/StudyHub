import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  .loader {
    margin-bottom: 2rem;
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

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: var(--yellow);
    height: 3rem;
    width: 7rem;
    font-size: 1rem;
    color: var(--bg-color);
    border-radius: 0.3rem;
    transition-duration: 0.3s;
    font-weight: 500;
    &:hover {
      filter: brightness(0.8);
    }
  }
`