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
    await request(server).get('/').expect(200);
  });

  it('GET 404', async () => {
    await request.agent(server).get('/wrong-path').expect(404);
  });
});
/*
describe('users CRUD', () => {
  let server;
  beforeEach(async () => {
    server = app().listen();
  });
  afterEach((done) => {
    server.close();
    done();
  });

  it('Create user test', async () => {
    await request.agent(server).post('/users').send({ form: user1 }).expect(302);
    const { email, firstName } = user1;
    const user = await db.User.findOne({ where: { email } });
    expect(user.firstName).toBe(firstName);
  });
  it('Create many users', async () => {
    await request.agent(server).post('/users').send({ form: user1 }).expect(302);
    await request.agent(server).post('/users').send({ form: user2 }).expect(302);
    await request.agent(server).post('/users').send({ form: user3 }).expect(302);
    const users = await db.User.findAll();
    expect(users).toHaveLength(3);
  });
  it('Update user', async () => {
    await request.agent(server).post('/users').send({ form: user1 }).expect(302);
    const { email } = user1;
    const user = await db.User.findOne({ where: { email } });
    await request.agent(server).patch(`/users/${user.id}/edit`).send({ form: { firstName: user2.firstName } }).expect(200);
    const userUpdate = await db.User.findOne({ where: { email } });
    const { firstName } = user2;
    expect(userUpdate.firstName).toBe(firstName);
  });
  it('Delete user', async () => {
    await request.agent(server).post('/users').send({ form: user1 }).expect(302);
    const { email } = user1;
    const user = await db.User.findOne({ where: { email } });
    await request.agent(server).delete(`/users/${user.id}`).expect(302);
  });
});
*/
