import _ from 'lodash';
import Router from 'koa-router';
import arrayMove from 'array-move';

const getNextId = () => Number(_.uniqueId()) - 1;

export default (router, io) => {
  const defaultState = {
    points: [],
    currentPointId: 0,
    currentCenter: { center: [55.75, 37.57], zoom: 9 },
  };

  /**
 points: [
      { id: homePointId, name: 'home', removable: false },
      { id: workPointlId, name: 'work', removable: false },
    ],
 */

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/points', (ctx) => {
      ctx.body = state.points;
      ctx.status = 301;
    })
    .post('/points', (ctx) => {
      const { data: { attributes: { name, center } } } = ctx.request.body;
      const point = {
        name,
        center,
        id: getNextId(),
      };
      state.points.push(point);
      ctx.status = 201;
      const data = {
        data: {
          type: 'points',
          id: point.id,
          attributes: point,
        },
      };
      ctx.body = data;
      io.emit('newPoint', data);
    })
    .delete('/points/:id', (ctx) => {
      const pointId = Number(ctx.params.id);
      state.points = state.points.filter(c => c.id !== pointId);
      ctx.status = 204;
      const data = {
        data: {
          type: 'points',
          id: pointId,
        },
      };
      io.emit('removePoint', data);
    })
    .patch('/points/:id', (ctx) => {
      const pointId = Number(ctx.params.id);
      const point = state.points.find(c => c.id === pointId);
      const { attributes } = ctx.request.body.data;
      if (attributes.name) {
        point.name = attributes.name;
      } else {
        point.center = attributes.center;
      }
      ctx.status = 204;
      const data = {
        data: {
          type: 'points',
          id: pointId,
          attributes: point,
        },
      };
      io.emit('changePoint', data);
    })
    .put('/points', (ctx) => {
      console.log('hello')
      const { attributes } = ctx.request.body.data;
      console.log(attributes)
      console.log(state.points)
      state.points = arrayMove(state.points, attributes.oldIndex, attributes.newIndex)
        .map((el, ind) => ({ ...el, id: ind }));
      console.log(state.points)
      ctx.status = 204;
      const data = {
        data: {
          mutateArray: state.points,
        },
      };
      io.emit('movePoint', data);
    });

  return router
    .get('root', '/', (ctx) => {
      ctx.render('index', { gon: state });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
