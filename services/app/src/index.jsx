import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import gon from 'gon';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { App } from './components';
import * as actions from './actions';
import reducers from './reducers';


/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const initState = {
  points: _.keyBy(gon.points, 'id'),
  currentPointId: gon.currentPointId,
  currentCenter: gon.currentCenter,
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

socket.on('newPoint', ({ data: { attributes } }) => {
  store.dispatch(actions.addPointSuccess(attributes));
});
socket.on('removePoint', ({ data }) => {
  store.dispatch(actions.deletePointSuccess(data));
});
socket.on('changePoint', ({ data }) => {
  store.dispatch(actions.changePointSuccess(data));
});
socket.on('movePoint', ({ data }) => {
  store.dispatch(actions.movePointSuccess(data));
});
// -------------

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('chat'));
