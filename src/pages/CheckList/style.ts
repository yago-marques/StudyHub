import styled from "styled-components"

export const Container = styled.section`
  .checklist {
    width: 70rem;
    margin: 0 auto;
    margin-top: 5rem;
    padding-bottom: 10rem;

    div.add-bar {
      display: flex;
      justify-content: space-between;
      input {
        background-color: white;
        width: 55rem;
        padding: 1rem;
        border-radius: 0.4rem;
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: var(--yellow);
        height: 3.3rem;
        width: 10rem;
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

    h2 {
      margin-top: 2rem;
    }

    div.no-task {
      color: white;
      margin-top: 1rem;
      font-style: italic;
      opacity: 0.7;
    }

    div.tasks {
      background-color: var(--shape);
      padding: 1.5rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;

      p {
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
      }

      .footer {
        font-size: 0.9rem;
        font-weight: 400;
        font-style: italic;
        opacity: 0.8;
      }

      button {
        background-color: transparent;
        height: 2rem;
        width: 2rem;
        .icon {
          color: var(--yellow);
          font-size: 2rem;
          transition-duration: .4s;
          &:hover {
            color: green;
          }
        }
      }
    }
  }
`