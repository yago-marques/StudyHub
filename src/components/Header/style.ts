import styled from "styled-components"

export const Container = styled.header`
  position: sticky;
  top: 0px;
  width: 100vw;
  background: var(--shape);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    margin-left: 3rem;
  }

  nav {
    
    button {
      width: 10rem;
      height: 5rem;
      background: var(--shape);
      .img {
        color: white;
        font-size: 1.2rem;
      }
      p {
        color: white;
      }

      &:hover {
        filter: opacity(0.7);
      }
    }
  }

  div.menu {
    .drop-item {
      text-align: center;
      width: 15rem;
      padding: 0.5rem;
    }

    button {
      width: 3rem;
      height: 5rem;
      margin-right: 3rem;
      background: var(--shape);
      .bgUser {
        width:2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--yellow);
        span {
          font-size: 1rem;
          font-weight: 600;
        }
      }
      .img {
        color: var(--shape);
        font-size: 1.5rem;
      }

      &:hover {
        filter: opacity(0.7);
      }
    }
  }
  
  
`