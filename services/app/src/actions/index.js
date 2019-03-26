import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const setCurrentChannnelId = createAction('SET_CHANNEL_ID');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = routes.channel();
    const data = {
      attributes: { name },
    };
    await axios.post(url, { data });
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const deleteChannel = id => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const url = routes.channels(id);
    await axios.delete(url);
  } catch (e) {
    dispatch(deleteChannelFailure());
    throw e;
  }
};

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const renameChannel = ({ channelId, name }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.channels(channelId);
    const data = {
      attributes: {
        name,
      },
    };
    await axios.patch(url, { data });
  } catch (e) {
    dispatch(renameChannelFailure());
  }
};
