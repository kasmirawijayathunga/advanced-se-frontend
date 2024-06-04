import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes';

import { StateProvider } from './store/StateProvider';
import reducer, { initialState } from './store/reducer';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Theme from './app/theme';

//@ts-expect-error
const router = createBrowserRouter([...routes]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </StateProvider>
  </React.StrictMode>
);