import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const points = handleActions({
  [actions.addPointSuccess](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.deletePointSuccess](state, { payload }) {
    return _.omit(state, payload.id);
  },
  [actions.changePointSuccess](state, { payload: { id, attributes } }) {
    return { ...state, [id]: attributes };
  },
  [actions.movePointSuccess](state, { payload: { mutateArray } }) {
    return _.keyBy(mutateArray, 'id');
  },
}, {});

const currentCenter = handleActions({
  [actions.setCurrentCenter](state, { payload }) {
    return { ...payload };
  },
}, {});

export default combineReducers({
  points,
  currentCenter,
  form: formReducer,
});
