import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { App } from './components';
import * as actions from './actions';
import reducers from './reducers';
import { UserProvider } from './context/UserContext';


/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const user = faker.name.findName();
cookies.set('name', user);

const initState = {
  channels: _.keyBy(gon.channels, 'id'),
  messages: _.keyBy(gon.messages, 'id'),
  currentChannelId: gon.currentChannelId,
};
const store = createStore(
  reducers,
  initState,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

// -------------
const socket = io();

socket.on('newChannel', ({ data: { attributes } }) => {
  store.dispatch(actions.addChannelSuccess(attributes));
});
socket.on('removeChannel', ({ data }) => {
  store.dispatch(actions.deleteChannelSuccess(data));
});
socket.on('renameChannel', ({ data }) => {
  store.dispatch(actions.renameChannelSuccess(data));
});
// -------------

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render((
  <Provider store={store}>
    <UserProvider value={user}>
      <App />
    </UserProvider>
  </Provider>
), document.getElementById('chat'));
