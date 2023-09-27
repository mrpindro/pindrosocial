import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import thunk from 'redux-thunk'
import reducers from './reducers';
import './index.css';
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId='176979189211-lcur1aa2c3r946tv6ho5mdtirb76h9ik.apps.googleusercontent.com'
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
