import { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

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
  input, button, textarea{ 
    outline: none;
    border: none;
    color: var(--shape);
    background: white;
  }
  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
    color: var(--text-title);
  }
  button, select{
    cursor: pointer;
  } 

  .react-modal-overlay{
    background: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content{
    width: 100%;
    max-width: 700px;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
    overflow: auto;
  }

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
  
  [disabled]{
    cursor: not-allowed;
  }
`;
