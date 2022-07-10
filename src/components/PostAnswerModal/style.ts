import styled from "styled-components"

export const Container = styled.section`
  .closeModalIcon {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    color: red;
    font-size: 1.5rem;
    cursor: pointer;
    background-color: white;
  }

  form {
    h1 {
      color: var(--text-title);
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    p {
      color: var(--text-body);
      font-size: 1rem;
      font-weight: 300;
      margin-bottom: 0.5rem;
      margin-top: 1.5rem;
    }
    textarea {
      padding: 1rem;
    }
    input {
      border: none;
      background: white;
      padding: 1rem;
      width: 20rem;
      border-radius: 0.3rem;
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
      margin-top: 2rem;
      &:hover {
        filter: brightness(0.8);
      }
    }

    .loader {
      height: 1rem;
      width: 1rem;
      border: 2px solid transparent;
      border-bottom-color: var(--bg-color);
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
  }
`