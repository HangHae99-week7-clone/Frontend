import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import App from './App';
import './index.css';
import userSlice from './app/module/userSlice';


if (localStorage.token) {
  store.dispatch(userSlice.actions.currentUser({email: localStorage.email, nickname: localStorage.nickname}))
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);