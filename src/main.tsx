// Module imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Import app and store
import App from './App.tsx';
import store from './data/store.ts';

// Modal imports
import Modal from './components/Modal/index.tsx';
import { ModalProvider } from './context/ModalContext.tsx';

// Style imports
import './styles/index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <App />
          <Modal />
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
