import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Header from './components/Header';
import Routes from './routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store'
import { Router } from 'react-router-dom';
import history from './services/history';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} className="toast-container" />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;