const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const TilesetRouter = require('../routes/Tilesets');
const Tileset = require('../models/Tileset');

const app = express();
app.use(express.json());
app.use('/tilesets', TilesetRouter);

// Use a test database URI (adjust as needed)
const TEST_DB_URI = 'mongodb://127.0.0.1:27017/bingo_test';

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Tilesets API', () => {
  let testId;
  it('should create a new tileset', async () => {
    const res = await request(app)
      .post('/tilesets')
      .send({
        name: 'TestTileset',
        description: 'A test tileset',
        size: 3,
        tiles: ['1','2','3','4','5','6','7','8','9'],
        tags: ['test']
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('TestTileset');
    testId = res.body._id;
  });

  it('should get all tilesets', async () => {
    const res = await request(app).get('/tilesets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a tileset by id', async () => {
    const res = await request(app).get(`/tilesets/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testId);
  });

  it('should update a tileset', async () => {
    const res = await request(app)
      .put(`/tilesets/${testId}`)
      .send({ description: 'Updated desc' });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated desc');
  });

  it('should search tilesets by name', async () => {
    const res = await request(app)
      .post('/tilesets/search')
      .send({ names: ['TestTileset'] });
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe('TestTileset');
  });

  it('should upvote a tileset', async () => {
    const res = await request(app).post(`/tilesets/${testId}/upvote`);
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(1);
  });

  it('should downvote a tileset', async () => {
    const res = await request(app).post(`/tilesets/${testId}/downvote`);
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(0);
  });

  it('should delete a tileset', async () => {
    const res = await request(app).delete(`/tilesets/${testId}`);
    expect(res.statusCode).toBe(200);
    const getRes = await request(app).get(`/tilesets/${testId}`);
    expect(getRes.statusCode).toBe(404);
  });
});
