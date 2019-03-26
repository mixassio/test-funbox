import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const defaultPoint = 1;

const currentPointId = handleActions({
  [actions.setCurrentPointId](state, { payload: pointId }) {
    return pointId;
  },
  [actions.deletePointSuccess]() {
    return defaultPoint;
  },
}, '');

const points = handleActions({
  [actions.addPointSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.deletePointSuccess](state, { payload }) {
    return _.omit(state, payload.id);
  },
  [actions.renamePointSuccess](state, { payload: { id, attributes } }) {
    return { ...state, [id]: attributes };
  },
}, {});


export default combineReducers({
  currentPointId,
  points,
  form: formReducer,
});
