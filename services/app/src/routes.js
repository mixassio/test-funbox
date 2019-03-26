const routes = {
  channels: id => `/api/v1/channels/${id}`,
  channel: () => '/api/v1/channels',
  message: id => `/api/v1/channels/${id}/messages`,
};
export default routes;
