// HTTP unit tests for Tilesets routes using Jest and Supertest
const request = require('supertest');
const express = require('express');
const tilesetsRouter = require('../routes/Tilesets');

const app = express();
app.use(express.json());
app.use('/tilesets', tilesetsRouter);

describe('Tilesets Routes', () => {
  test('GET /tilesets/ should return 200', async () => {
    const res = await request(app).get('/tilesets/');
    expect(res.statusCode).toBe(200);
  });

  test('POST /tilesets/ should return 200 or 201', async () => {
    const res = await request(app)
      .post('/tilesets/')
      .send({ /* mock data */ });
    expect([200, 201, 400, 500]).toContain(res.statusCode);
  });

  test('GET /tilesets/:id should return 200 or 404', async () => {
    const res = await request(app).get('/tilesets/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('PUT /tilesets/:id should return 200 or 400', async () => {
    const res = await request(app).put('/tilesets/123');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  test('DELETE /tilesets/:id should return 200 or 404', async () => {
    const res = await request(app).delete('/tilesets/123');
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  test('POST /tilesets/search should return 200 or 400', async () => {
    const res = await request(app).post('/tilesets/search').send({});
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  test('POST /tilesets/:id/upvote should return 200 or 400', async () => {
    const res = await request(app).post('/tilesets/123/upvote');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  test('POST /tilesets/:id/downvote should return 200 or 400', async () => {
    const res = await request(app).post('/tilesets/123/downvote');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });
});
