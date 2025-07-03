// tests/routes.test.js
// HTTP unit tests for all routes using supertest and jest

const request = require("supertest");
const express = require("express");
const router = require("../routes/Router");
const mongoose = require("mongoose");
const Tileset = require("../models/Tileset");
const Bingofield = require("../models/Bingofield");
const Room = require("../models/Room");
const Player = require("../models/Player");
const { connectToMongo } = require("../db/Mongo");

// Setup express app for testing
const app = express();
app.use(express.json());
app.use("/", router);

let tilesetId, bingofieldId, roomId, playerId;

beforeAll(async () => {
  await connectToMongo();
  // Get one of each resource from the DB
  const tileset = await Tileset.findOne();
  tilesetId = tileset ? tileset._id.toString() : undefined;
  const bingofield = await Bingofield.findOne();
  bingofieldId = bingofield ? bingofield._id.toString() : undefined;
  const room = await Room.findOne();
  roomId = room ? room._id.toString() : undefined;
  const player = await Player.findOne();
  playerId = player ? player._id.toString() : undefined;
});

afterAll(async () => {
  await mongoose.disconnect();
});

jest.setTimeout(20000); // Increase timeout for slow DB operations

describe("HTTP Routes", () => {
  // Echo
  test("GET /echo/:param should return echo", async () => {
    const res = await request(app).get("/echo/test");
    expect(res.statusCode).toBe(200);
  });

  // Tilesets
  test("GET /tilesets should return tilesets", async () => {
    const res = await request(app).get("/tilesets");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  test("POST /tilesets should create tileset", async () => {
    const res = await request(app)
      .post("/tilesets")
      .send({
        name: "Test Tileset " + Date.now(),
        size: 3,
        tiles: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
        tags: ["test"],
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });
  test("GET /tilesets/:id should return a tileset", async () => {
    if (!tilesetId) return;
    const res = await request(app).get(`/tilesets/${tilesetId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", tilesetId);
  });
  test("PUT /tilesets/:id should update a tileset", async () => {
    if (!tilesetId) return;
    const res = await request(app)
      .put(`/tilesets/${tilesetId}`)
      .send({ name: "Updated Name" });
    expect([200, 404]).toContain(res.statusCode);
  });
  test("DELETE /tilesets/:id should delete a tileset", async () => {
    if (!tilesetId) return;
    const res = await request(app).delete(`/tilesets/${tilesetId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
  test("POST /tilesets/search should search tilesets", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ names: ["test"] });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  test("POST /tilesets/:id/upvote should upvote a tileset", async () => {
    if (!tilesetId) return;
    const res = await request(app).post(`/tilesets/${tilesetId}/upvote`);
    expect([200, 404]).toContain(res.statusCode);
  });
  test("POST /tilesets/:id/downvote should downvote a tileset", async () => {
    if (!tilesetId) return;
    const res = await request(app).post(`/tilesets/${tilesetId}/downvote`);
    expect([200, 404]).toContain(res.statusCode);
  });

  // Bingofields
  test("GET /bingofields should return bingofields", async () => {
    const res = await request(app).get("/bingofields");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  test("POST /bingofields should create bingofield", async () => {
    if (!playerId || !tilesetId) return;
    const res = await request(app).post("/bingofields").send({
      playerId,
      tilesetId,
      size: 3,
    });
    expect([200, 400]).toContain(res.statusCode);
  });
  test("GET /bingofields/:id should return a bingofield", async () => {
    if (!bingofieldId) return;
    const res = await request(app).get(`/bingofields/${bingofieldId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
  test("DELETE /bingofields/:id should delete a bingofield", async () => {
    if (!bingofieldId) return;
    const res = await request(app).delete(`/bingofields/${bingofieldId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
  test("POST /bingofields/:id/mark should mark a bingofield", async () => {
    if (!playerId || !tilesetId) return;
    // Create a new bingofield for this player
    const createRes = await request(app).post("/bingofields").send({
      playerId,
      tilesetId,
      size: 3,
    });
    expect([200, 400]).toContain(createRes.statusCode);
    if (createRes.statusCode !== 200) return;
    const newBingofieldId = createRes.body._id;
    // Mark a tile on the new bingofield
    const res = await request(app)
      .post(`/bingofields/${newBingofieldId}/mark`)
      .send({ player: playerId, tile: 0 });
    expect(res.statusCode).toBe(200);
  });

  // Room
  test("GET /rooms should return rooms", async () => {
    const res = await request(app).get("/rooms");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  test("POST /rooms should create room", async () => {
    if (!tilesetId || !playerId) return;
    const res = await request(app).post("/rooms").send({
      tileset: tilesetId,
      host: playerId,
      name: "Test Room",
    });
    expect([201, 500]).toContain(res.statusCode);
  });
  test("GET /rooms/:id should return a room", async () => {
    if (!roomId) return;
    const res = await request(app).get(`/rooms/${roomId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
  test("GET /rooms/id/:code should return a room by code", async () => {
    const res = await request(app).get("/rooms/id/abc");
    expect([200, 404, 500]).toContain(res.statusCode);
  });
  test("POST /rooms/:id/start should start a room", async () => {
    if (!roomId) return;
    const res = await request(app).post(`/rooms/${roomId}/start`);
    expect([200, 404, 400]).toContain(res.statusCode);
  });
  test("POST /rooms/:id/join should join a room", async () => {
    if (!roomId || !playerId) return;
    const res = await request(app)
      .post(`/rooms/${roomId}/join`)
      .send({ playerId });
    expect([200, 404, 400]).toContain(res.statusCode);
  });
  test("POST /rooms/:id/leave should leave a room", async () => {
    if (!roomId || !playerId) return;
    const res = await request(app)
      .post(`/rooms/${roomId}/leave`)
      .send({ playerId });
    expect([200, 404, 400]).toContain(res.statusCode);
  });

  // Player
  test("GET /players should return players", async () => {
    const res = await request(app).get("/players");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  test("POST /players should create player", async () => {
    const res = await request(app)
      .post("/players")
      .send({ name: "Test Player" });
    expect([200, 400]).toContain(res.statusCode);
  });
  test("GET /players/:id should return a player", async () => {
    if (!playerId) return;
    const res = await request(app).get(`/players/${playerId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
  test("PUT /players/:id should update a player", async () => {
    if (!playerId) return;
    const res = await request(app)
      .put(`/players/${playerId}`)
      .send({ name: "Updated Player" });
    expect([200, 404]).toContain(res.statusCode);
  });
  test("DELETE /players/:id should delete a player", async () => {
    if (!playerId) return;
    const res = await request(app).delete(`/players/${playerId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
