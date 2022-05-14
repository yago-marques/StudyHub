import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{
    --text-title: #ffffff;
    --text-body: #f6f6f6;
    --bg-color: #1b1d31;
    --shape: #24253d;
    --yellow: #ebe40d;
    --black-primary: #444444;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html{
    @media (max-width: 1080px){
      font-size: 93.75%; // 15px
    }
    @media (max-width: 720px){
      font-size: 87.5%; // 14px
    }
  }
  body, input, textarea, button{
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    background: var(--bg-color);
  }
  input { 
    outline: none;
  }
  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
  }
  button, select{
    cursor: pointer;
  } 
  [disabled]{
    cursor: not-allowed;
  }
`;
