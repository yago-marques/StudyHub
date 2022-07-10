import styled from "styled-components"

export const Container = styled.section`
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

    .no-icon {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
      
      transition-duration: 0.3s;
    }
  }
`