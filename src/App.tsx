import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './theme/GlobalStyle';
import { Routes } from './routes';

export function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}
