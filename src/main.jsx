import React from "react";
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate from redux-persist
import store from "./redux/store.js"
import { persistor } from './redux/store.js';
import { setupAxiosInterceptors } from './api/axiosInstance.js';

setupAxiosInterceptors(store);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
);
