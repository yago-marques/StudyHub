import styled from "styled-components"

export const Container = styled.section`
  overflow: auto;
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
    background: var(--shape);
    h1 {
      margin-left: 1rem;
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
        textarea {
          border: none;
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
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

    .inline {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
`