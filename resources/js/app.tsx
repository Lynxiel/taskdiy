import { createRoot } from 'react-dom/client';
import App from './components/App';
import React from 'react';
import createHttpPlugin from './plugins/http';
import createApi from './api/index';
import createStoragePlugin from './plugins/storage';
import createStore from './store/index'
import { Provider } from 'react-redux';
import storageContext from './contexts/storageContext'; 
import actionsContext from './contexts/actionsContext'; 
import apiContext from './contexts/apiContext'; 
import { BrowserRouter } from 'react-router-dom';
import initRequestAuthToken from './connectors/initRequestAuthToken';
import { ThemeProvider, createTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
import initHttpErrorsHandler from './connectors/initHttpErrorsHandler';
import { TUser } from './types/data'
import { pink, yellow } from '@mui/material/colors';



export const themeOptions: ThemeOptions = {
  
  palette: { 
    mode: 'light',
    primary: { 
        main: '#458fc6', 
    }, 
    secondary: { 
        main: '#A2C9E2', 
    }, 
    success: { 
        main: '#a2e2dc', 
    }, 
    warning: { 
        main: '#e2bca2', 
    }, 
    info: { 
        main: '#a2a8e2', 
    }, 
    error: { 
        main: '#e2a2c8', 
    }} 
};

const rootElement = document.getElementById('app')!;
const root = createRoot(rootElement);

const http = createHttpPlugin('http://localhost:80/');
  const api = createApi(http);
  const storage = createStoragePlugin();
  const { store, actions } = createStore(api);
  const defaultTheme = createTheme(themeOptions);
  
  // initRequestAuthToken(http, storage);
  initHttpErrorsHandler(http);

  const result = await store.dispatch(actions.auth.init());
  const user = store.getState().auth.user ;
  console.log('checked',user);
  if ( user  ){
    const boards = await store.dispatch(actions.boards.loadUserBoards(user.id));
    console.log('boards',boards);
    
  }
  

  const app = <Provider store={store}>
    <storageContext.Provider value={storage}>
      <apiContext.Provider value={api}>
        <actionsContext.Provider value={actions}>
          <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </actionsContext.Provider>
      </apiContext.Provider>
    </storageContext.Provider>
  </Provider>

root.render(app);