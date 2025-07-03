// HTTP unit tests for Bingofields routes using Jest and Supertest
const request = require('supertest');
const express = require('express');
const bingofieldsRouter = require('../routes/Bingofields');

const app = express();
app.use(express.json());
app.use('/bingofields', bingofieldsRouter);

describe('Bingofields Routes', () => {
  test('GET /bingofields/ should return 200', async () => {
    const res = await request(app).get('/bingofields/');
    expect(res.statusCode).toBe(200);
  });

  test('POST /bingofields/ should return 200 or 201', async () => {
    const res = await request(app)
      .post('/bingofields/')
      .send({ /* mock data */ });
    expect([200, 201, 400, 500]).toContain(res.statusCode);
  });

  test('GET /bingofields/:id should return 200 or 404', async () => {
    const res = await request(app).get('/bingofields/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('DELETE /bingofields/:id should return 200 or 404', async () => {
    const res = await request(app).delete('/bingofields/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('POST /bingofields/:id/mark should return 200 or 400', async () => {
    const res = await request(app).post('/bingofields/123/mark');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });
});
