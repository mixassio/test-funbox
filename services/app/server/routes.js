import _ from 'lodash';
import Router from 'koa-router';

const getNextId = () => Number(_.uniqueId());

export default (router, io) => {
  const generalChannelId = getNextId();
  const randomChannelId = getNextId();
  const defaultState = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
    ],
    currentChannelId: generalChannelId,
  };

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/channels', (ctx) => {
      ctx.body = state.channels;
      ctx.status = 301;
    })
    .post('/channels', (ctx) => {
      const { data: { attributes: { name } } } = ctx.request.body;
      const channel = {
        name,
        removable: true,
        id: getNextId(),
      };
      state.channels.push(channel);
      ctx.status = 201;
      const data = {
        data: {
          type: 'channels',
          id: channel.id,
          attributes: channel,
        },
      };
      ctx.body = data;

      io.emit('newChannel', data);
    })
    .delete('/channels/:id', (ctx) => {
      const channelId = Number(ctx.params.id);
      state.channels = state.channels.filter(c => c.id !== channelId);
      ctx.status = 204;
      const data = {
        data: {
          type: 'channels',
          id: channelId,
        },
      };
      io.emit('removeChannel', data);
    })
    .patch('/channels/:id', (ctx) => {
      const channelId = Number(ctx.params.id);
      const channel = state.channels.find(c => c.id === channelId);

      const { attributes } = ctx.request.body.data;
      channel.name = attributes.name;
      ctx.status = 204;
      const data = {
        data: {
          type: 'channels',
          id: channelId,
          attributes: channel,
        },
      };
      io.emit('renameChannel', data);
    });

  return router
    .get('root', '/', (ctx) => {
      ctx.render('index', { gon: state });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
