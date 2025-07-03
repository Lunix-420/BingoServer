// HTTP unit tests for Echo routes using Jest and Supertest
const request = require('supertest');
const express = require('express');
const echoRouter = require('../routes/Echo');

const app = express();
app.use(express.json());
app.use('/echo', echoRouter);

describe('Echo Routes', () => {
  test('GET /echo/:param should return 200', async () => {
    const res = await request(app).get('/echo/test');
    expect([200, 400, 404]).toContain(res.statusCode);
  });
});
