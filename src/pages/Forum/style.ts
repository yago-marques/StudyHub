import styled from "styled-components"

export const Container = styled.section`
  width: 70rem;
  margin-top: 5rem;

  .searchBar {
    display: flex;
    background-color: white;
    padding: 1rem;
    width: 70rem;
    border-radius: 0.4rem;

    .icon {
      margin-right: 1rem;
      font-size: 2rem;
      color: gray;
    }

    input {
      color: gray;
      width: 50rem;
    }
  }

  .no-post {
    color: white;
    margin-top: 2rem;
    font-style: italic;
    opacity: 0.6;
  }

  .askQuestionBtn {
    margin-top: 2rem;
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

  .posts {
    .posts-title {
      margin-top: 2rem;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .ask {
      display: flex;
      align-items: center;
      margin-top: 2rem;
      margin-bottom: 2rem;

      .rating {
        color: white;
        font-size: 1.5rem;
        margin-right: 3rem;
      }

      button {
        width: 100%;
        background: none;
        .content {
          background-color: var(--shape);
          width: 100%;
          border-radius: 0.8rem;
          color: var(--shape);
          border: 1px solid var(--shape);
          padding: 1rem;
          transition-duration: 0.2s;
          transition-delay: 0.1s;
          transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

          .header {
            .userName {
              display: flex;
              align-items: center;

              h3 {
                margin-right: 0.5rem;
                font-size: 1.2rem;
                font-weight: 500;
                color: var(--yellow);
              }

              span {
                color: white;
                font-size: 0.8rem;
                font-weight: 500;
                opacity: 0.5;
              }
            }
          }

          .body {
            margin-top: 0.5rem;

            .title {
              h4 {
                color: white;
                font-size: 1.8rem;
                font-weight: 400;
                text-align: left;
              }
            }

            .tags {
              margin-top: 0.5rem;
              display: flex;
              
              .tag {
                h5 {
                  font-size: 0.9rem;
                  font-weight: 500;
                  opacity: 0.8;
                }
                margin-right: 1rem;
              }
            }
          }

          .footer {
            margin-top: 1.5rem;
            display: flex;

            h4 {
              font-size: 0.8rem;
              font-weight:400;
              margin-right: 1rem;
              opacity: 0.5;
            }
          }

          &:hover {
            border: 1px solid var(--yellow);
          }
        }
      }
      

    }
  }

`