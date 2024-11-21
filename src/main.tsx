import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from "react-redux";
import store from './store.tsx';
import Snackbar from './components/errorSnackbar.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Snackbar/>
    </Provider>
  </StrictMode>
);
