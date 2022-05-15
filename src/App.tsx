import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from './theme/GlobalStyle';
import { Routes } from './routes';

export function App() {
  return (
    <>
      <GlobalStyle/>
      <ToastContainer autoClose={5000} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}
