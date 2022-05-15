import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1 {
    font-size: 2rem;
    color: var(--shape);
    font-weight: 600;
    background-color: var(--yellow);
    width: 50rem;
    padding: 0.5rem;
    text-align: center;
  }
  form {
    background: var(--shape);
    width: 50rem;
    padding: 3rem;
    padding-left: 2rem;
    .goToLogin {
      display: flex;
      margin-bottom: 1rem;
      p {
        color: var(--text-body);
        font-size: 1rem;
        margin-left: 1rem;
      }
      .login {
        margin-left: 1rem;
        border: none;
        font-size: 1rem;
        background: transparent;
        color: var(--yellow);
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .row {
      display: flex;
      div {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        span {
          color: var(--text-body);
          font-size: 0.8rem;
        }
        input {
          border: none;
          background: white;
          padding: 1rem;
          width: 20rem;
          border-radius: 0.3rem;
        }
      }
    }
    .register {
      margin-left: 1rem;
      margin-top: 1.5rem;
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
  }
`