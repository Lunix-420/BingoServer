// HTTP unit tests for Router.js (main router) using Jest and Supertest
const request = require('supertest');
const express = require('express');
const router = require('../routes/Router');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Main Router', () => {
  test('GET /unknown should return 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
  });
});
