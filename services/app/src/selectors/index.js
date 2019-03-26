import { createSelector } from 'reselect';

const getChannels = state => state.channels;
const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);

const getMessages = ({ messages, currentChannelId }) => ({ messages, currentChannelId });
const messagesSelector = createSelector(
  getMessages,
  state => Object.values(state.messages).filter(item => item.channelId === state.currentChannelId),
);

export { channelsSelector, messagesSelector };
