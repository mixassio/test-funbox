import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const defaultChannel = 1;

const currentChannelId = handleActions({
  [actions.setCurrentChannnelId](state, { payload: channelId }) {
    return channelId;
  },
  [actions.deleteChannelSuccess]() {
    return defaultChannel;
  },
}, '');

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.deleteChannelSuccess](state, { payload }) {
    return _.omit(state, payload.id);
  },
  [actions.renameChannelSuccess](state, { payload: { id, attributes } }) {
    return { ...state, [id]: attributes };
  },
}, {});


export default combineReducers({
  currentChannelId,
  channels,
  form: formReducer,
});
