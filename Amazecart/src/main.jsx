import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes/routes.jsx';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import countreducer from './reducers/countreducer.js';
import { logger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import rootreducer from './reducers/rootreducer.js';

import ApiContextProvider from './ApiContextProvider.jsx';
import UserContextProvider from './usercontextprovider.jsx';

let router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes
  },
]);
const store = createStore(countreducer, applyMiddleware(logger, thunk));

createRoot(document.getElementById('root')).render(
  <ApiContextProvider>
    <UserContextProvider>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </UserContextProvider>
  </ApiContextProvider>
)
