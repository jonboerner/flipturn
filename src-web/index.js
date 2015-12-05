import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './jsx/App';
import reducer from './reducers/main';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';
// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const finalCreateStore = compose(
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

let store = finalCreateStore(reducer);

let rootElement = document.getElementById('root');

render(
   <div>
     <Provider store={store}>
       <App />
     </Provider>

     <DebugPanel top right bottom>
       <DevTools store={store} monitor={LogMonitor} />
     </DebugPanel>
  </div>,
  rootElement
);
