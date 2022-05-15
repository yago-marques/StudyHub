import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .toggleAuth {
    position: relative;
    height: 27rem;
    width: 26rem;
    background-color: var(--yellow);
    padding: 3rem;
    padding-top: 2rem;
    h1 {
      font-size: 2.5rem;
      color: var(--shape);
      margin-bottom: 0.5rem;
    }
    div {
      display: flex;
      p {
        color: var(--shape);
        font-size: 1rem;
      }
      .register {
        margin-left: 1rem;
        border: none;
        font-size: 1rem;
        background: transparent;
        color: blue;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    img {
      width: 27rem;
      position: absolute;
      bottom: 0px;
      left: 0px;
    }
  }
  .form {
    width: max-content;
    background: var(--shape);
    form {
      padding: 3rem;
      height: 27rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
        font-size: 1.5rem;
        color: var(--text-title);
        text-align: center;
        font-weight: 500;
      }
      div {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        margin-bottom: 1rem;
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
      div.buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 1.5rem;

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

        .login {
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

        .forgotPass {
          border: none;
          background: transparent;
          color: var(--text-body);
          transition-duration: 0.3s;

          &:hover {
            color: var(--yellow);
          }
        }
      }
    }
  }
`