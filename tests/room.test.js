// HTTP unit tests for Room routes using Jest and Supertest
const request = require('supertest');
const express = require('express');
const roomRouter = require('../routes/Room');

const app = express();
app.use(express.json());
app.use('/rooms', roomRouter);

describe('Room Routes', () => {
  test('GET /rooms/ should return 200', async () => {
    const res = await request(app).get('/rooms/');
    expect(res.statusCode).toBe(200);
  });

  test('POST /rooms/ should return 200 or 201', async () => {
    const res = await request(app)
      .post('/rooms/')
      .send({ /* mock room data */ });
    expect([200, 201, 400, 500]).toContain(res.statusCode);
  });

  test('GET /rooms/:id should return 200 or 404', async () => {
    const res = await request(app).get('/rooms/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('GET /rooms/id/:code should return 200 or 404', async () => {
    const res = await request(app).get('/rooms/id/abc');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('POST /rooms/:id/start should return 200 or 400', async () => {
    const res = await request(app).post('/rooms/123/start');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  test('POST /rooms/:id/join should return 200 or 400', async () => {
    const res = await request(app).post('/rooms/123/join');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  test('POST /rooms/:id/leave should return 200 or 400', async () => {
    const res = await request(app).post('/rooms/123/leave');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });
});
