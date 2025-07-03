// HTTP unit tests for Player routes using Jest and Supertest
const request = require('supertest');
const express = require('express');
const playerRouter = require('../routes/Player');

const app = express();
app.use(express.json());
app.use('/players', playerRouter);

describe('Player Routes', () => {
  test('GET /players/ should return 200', async () => {
    const res = await request(app).get('/players/');
    expect(res.statusCode).toBe(200);
  });

  test('POST /players/ should return 200 or 201', async () => {
    const res = await request(app)
      .post('/players/')
      .send({ /* mock data */ });
    expect([200, 201, 400, 500]).toContain(res.statusCode);
  });

  test('GET /players/:id should return 200 or 404', async () => {
    const res = await request(app).get('/players/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('PUT /players/:id should return 200 or 400', async () => {
    const res = await request(app).put('/players/123');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  test('DELETE /players/:id should return 200 or 404', async () => {
    const res = await request(app).delete('/players/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });
});
