const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const BingofieldsRouter = require("../routes/Bingofields");
const Bingofield = require("../models/Bingofield");

const app = express();
app.use(express.json());
app.use("/bingofields", BingofieldsRouter);

// Use a test database URI (adjust as needed)
const TEST_DB_URI = "mongodb://127.0.0.1:27017/bingo_test";

let testUserId, testGameId, testTilesetId;

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
  // Insert dummy ObjectIds for user, game, tileset
  testUserId = new mongoose.Types.ObjectId();
  testGameId = new mongoose.Types.ObjectId();
  testTilesetId = new mongoose.Types.ObjectId();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Bingofields API", () => {
  let testId;
  it("should create a new bingofield", async () => {
    const res = await request(app)
      .post("/bingofields")
      .send({
        tilesetId: testTilesetId,
        userId: testUserId,
        gameId: testGameId,
        tiles: ["A", "B", "C", "D"],
        marked: [false, false, false, false],
        size: 2,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    testId = res.body._id;
  });

  it("should get all bingofields", async () => {
    const res = await request(app).get("/bingofields");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a bingofield by id", async () => {
    const res = await request(app).get(`/bingofields/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testId);
  });

  it("should update a bingofield", async () => {
    const res = await request(app)
      .put(`/bingofields/${testId}`)
      .send({ isWinner: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.isWinner).toBe(true);
  });

  it("should get bingofields by userId", async () => {
    const res = await request(app).get(
      `/bingofields/search/user/${testUserId}`
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].userId).toBe(testUserId.toString());
  });

  it("should get bingofields by gameId", async () => {
    const res = await request(app).get(
      `/bingofields/search/game/${testGameId}`
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].gameId).toBe(testGameId.toString());
  });

  it("should delete a bingofield", async () => {
    const res = await request(app).delete(`/bingofields/${testId}`);
    expect(res.statusCode).toBe(200);
    const getRes = await request(app).get(`/bingofields/${testId}`);
    expect(getRes.statusCode).toBe(404);
  });
});

describe("Bingofields API - error and edge cases", () => {
  it("should return 404 for get with invalid ID", async () => {
    const res = await request(app).get("/bingofields/invalidid123");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for update with invalid ID", async () => {
    const res = await request(app)
      .put("/bingofields/invalidid123")
      .send({ isWinner: true });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for delete with invalid ID", async () => {
    const res = await request(app).delete("/bingofields/invalidid123");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
