import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const setCurrentPointId = createAction('SET_POINT_ID');

export const setCurrentCenter = createAction('SET_CURRENT_CENTER');

export const addPointRequest = createAction('POINT_ADD_REQUEST');
export const addPointSuccess = createAction('POINT_ADD_SUCCESS');
export const addPointFailure = createAction('POINT_ADD_FAILURE');

export const addPoint = (name, { center }) => async (dispatch) => {
  dispatch(addPointRequest());
  try {
    const url = routes.point();
    const data = {
      attributes: { name, center },
    };
    await axios.post(url, { data });
  } catch (e) {
    dispatch(addPointFailure());
    throw e;
  }
};

export const deletePointRequest = createAction('POINT_DELETE_REQUEST');
export const deletePointSuccess = createAction('POINT_DELETE_SUCCESS');
export const deletePointFailure = createAction('POINT_DELETE_FAILURE');

export const deletePoint = id => async (dispatch) => {
  dispatch(deletePointRequest());
  try {
    const url = routes.points(id);
    await axios.delete(url);
  } catch (e) {
    dispatch(deletePointFailure());
    throw e;
  }
};

export const changePointRequest = createAction('POINT_CHANGE_REQUEST');
export const changePointSuccess = createAction('POINT_CHANGE_SUCCESS');
export const changePointFailure = createAction('POINT_CHANGE_FAILURE');

export const changePoint = ({ pointId, change }) => async (dispatch) => {
  dispatch(changePointRequest());
  try {
    const url = routes.points(pointId);
    const data = {
      attributes: { ...change },
    };
    await axios.patch(url, { data });
  } catch (e) {
    dispatch(changePointFailure());
  }
};
