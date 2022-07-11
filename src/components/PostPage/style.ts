import styled from 'styled-components';

export const Container = styled.section`
padding-bottom: 10rem;
  .askQuestionBtn {
    margin-left: 2.5vw;
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
  h2.answers {
    margin-left: 2.5vw;
    margin-top: 2rem;
  }

  .no-answer {
    margin-left: 2.5vw;
    color: white;
    margin-top: 2rem;
    font-style: italic;
    opacity: 0.6;
  }

  section.post-area {
    background: white;
    display: flex;
    width: 95vw;
    margin: 0 auto;
    margin-top: 3rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    

    .action-rating {
      margin-right: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
        cursor: pointer;
        transition-duration: 0.3s;

        &:hover {
          color: var(--yellow);
        }
      }
    }

    .post-data {
      width: 100%;
      h1, h2 {
        color: black;
      }
      h1 {
        font-size: 1.8rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      h2 {
        font-size: 1.2rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-weight: 400;
      }

      .post-header {
        opacity: 0.5;
        font-size: 0.8rem;
        display: flex;
        .tags {
          margin-left: 1.5rem;
        }
      }
    }
  }
`