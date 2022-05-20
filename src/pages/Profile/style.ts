import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .content {
    margin-top: 5rem;
    display: flex;
  }

  .personal-data {
    position: relative;
    width: 20rem;

    .edit {
      position: absolute;
      top: 2.5rem;
      right: 1rem;
      cursor: pointer;
      color: var(--bg-color);
      transition-duration: .3s;

      &:hover {
        color: #705714;
      }
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
      margin-left: 0.5rem;
    }

    .shape {
      background-color: #f5f5f5;
      padding: 1.5rem;
      border-radius: 0.5rem;
      .field {
        margin-bottom: 1rem;
        h3 {
          color: var(--bg-color);
          font-size: 1rem;

        }
        .value {
          color: var(--shape);
          font-size: 0.8rem;
          span {
            margin-left: 0.5rem;
            opacity: 0.7;
            text-decoration: underline;
          }
        }
      }
      .tag {
        margin-top: 2rem;
        span {
          background-color: var(--yellow);
          color: #705714;
          font-size: 0.8rem;
          border-radius: 0.4rem;
          padding: 0.5rem;
          padding-top: 0.4rem;
          padding-bottom: 0.4rem;
          border: solid 1px #705714;
        }
      }
    }
  }

  .posts-area {
    margin-left: 1rem;

    h2 {
      font-size: 1rem;
      font-weight: 400;
      margin-left: 0.5rem;
    }

    .shape {
      background-color: #f5f5f5;
      padding: 1.5rem;
      min-height: 30rem;
      width: 40rem;
      border-radius: 0.5rem;

      p {
        color: lightgray;
        font-size: 0.9rem;
      }
    }
  }
`