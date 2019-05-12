import request from 'supertest';
import app from '../server';

describe('requests', () => {
  let server;
  beforeEach(async () => {
    server = app().listen();
  });
  afterEach((done) => {
    server.close();
    done();
  });

  it('GET 200', async () => {
    await request.agent(server).get('/').expect(200);
  });

  it('GET 404', async () => {
    await request.agent(server).get('/wrong-path').expect(404);
  });

  it('GET /api/v1/points', async () => {
    const response = await request.agent(server).get('/api/v1/points');
    expect(response.status).toEqual(301);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual([]);
  });

  it('POST /api/v1/points', async () => {
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point', center: [55.75, 37.57] } } })
      .expect(201);
    const response = await request.agent(server).get('/api/v1/points');
    expect(response.status).toEqual(301);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual([{ name: 'point', center: [55.75, 37.57], id: 0 }]);
  });

  it('DELETE /points/:id', async () => {
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point1', center: [55.75, 37.57] } } })
      .expect(201);
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point2', center: [57.75, 39.57] } } })
      .expect(201);
    await request
      .agent(server)
      .delete('/api/v1/points/2')
      .expect(204);
    const response = await request.agent(server).get('/api/v1/points');
    expect(response.status).toEqual(301);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual([{ name: 'point1', center: [55.75, 37.57], id: 1 }]);
  });

  it('PATCH /api/v1/points/:id', async () => {
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point1', center: [55.75, 37.57] } } })
      .expect(201);
    await request
      .agent(server)
      .patch('/api/v1/points/3')
      .send({ data: { attributes: { name: 'changeName' } } })
      .expect(204);
    await request
      .agent(server)
      .patch('/api/v1/points/3')
      .send({ data: { attributes: { center: [11.75, 12.57] } } })
      .expect(204);
    const response = await request.agent(server).get('/api/v1/points');
    expect(response.status).toEqual(301);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual([{ name: 'changeName', center: [11.75, 12.57], id: 3 }]);
  });

  it('PUT /api/v1/points', async () => {
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point1', center: [55.75, 37.57] } } })
      .expect(201);
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point2', center: [56.75, 37.57] } } })
      .expect(201);
    await request
      .agent(server)
      .post('/api/v1/points')
      .send({ data: { attributes: { name: 'point3', center: [57.75, 37.57] } } })
      .expect(201);
    await request
      .agent(server)
      .put('/api/v1/points')
      .send({ data: { attributes: { oldIndex: 2, newIndex: 1 } } })
      .expect(204);
    const response = await request.agent(server).get('/api/v1/points');
    expect(response.status).toEqual(301);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      [
        { center: [55.75, 37.57], id: 0, name: 'point1' },
        { center: [57.75, 37.57], id: 1, name: 'point3' },
        { center: [56.75, 37.57], id: 2, name: 'point2' },
      ],
    );
  });
});
