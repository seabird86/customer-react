import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './components/App/App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // IMPORTANT Render two time because of StrictMode
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (400 <=error.response.status && error.response.status <= 499) {
      throw new Error(error.response?.data?.error?.message);
    }
    if (500 <=error.response.status && error.response.status <= 599) {
      throw new Error(`${error.response?.status}: ${error.response?.statusText}`);
    }
  }
);

// reportWebVitals();

