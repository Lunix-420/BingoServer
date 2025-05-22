const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const TilesetRouter = require("../routes/Tilesets");
const Tileset = require("../models/Tileset");

const app = express();
app.use(express.json());
app.use("/tilesets", TilesetRouter);

// Use a test database URI (adjust as needed)
const TEST_DB_URI = "mongodb://127.0.0.1:27017/bingo_test";

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI); // Removed deprecated options
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Tilesets API", () => {
  let testId;
  it("should create a new tileset", async () => {
    const res = await request(app)
      .post("/tilesets")
      .send({
        name: "TestTileset",
        description: "A test tileset",
        size: 3,
        tiles: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        tags: ["test"],
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("TestTileset");
    testId = res.body._id;
  });

  it("should get all tilesets", async () => {
    const res = await request(app).get("/tilesets");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a tileset by id", async () => {
    const res = await request(app).get(`/tilesets/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testId);
  });

  it("should update a tileset", async () => {
    const res = await request(app)
      .put(`/tilesets/${testId}`)
      .send({ description: "Updated desc" });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe("Updated desc");
  });

  it("should search tilesets by name", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ names: ["TestTileset"] });
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe("TestTileset");
  });

  it("should upvote a tileset", async () => {
    const res = await request(app).post(`/tilesets/${testId}/upvote`);
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(1);
  });

  it("should downvote a tileset", async () => {
    const res = await request(app).post(`/tilesets/${testId}/downvote`);
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(0);
  });

  it("should delete a tileset", async () => {
    const res = await request(app).delete(`/tilesets/${testId}`);
    expect(res.statusCode).toBe(200);
    const getRes = await request(app).get(`/tilesets/${testId}`);
    expect(getRes.statusCode).toBe(404);
  });
});

describe("Tilesets API - getTilesetsByFilter", () => {
  let ids = [];
  beforeAll(async () => {
    // Insert multiple tilesets for filter tests
    const sets = [
      {
        name: "Alpha",
        description: "Alpha set",
        size: 3,
        tiles: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        tags: ["easy", "starter"],
        rating: 5,
        plays: 10,
      },
      {
        name: "Beta",
        description: "Beta set",
        size: 4,
        tiles: [
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
        ],
        tags: ["medium"],
        rating: 2,
        plays: 5,
      },
      {
        name: "Gamma",
        description: "Gamma set",
        size: 5,
        tiles: Array.from({ length: 25 }, (_, i) => `${i}`),
        tags: ["hard", "challenge"],
        rating: 8,
        plays: 20,
      },
    ];
    for (const set of sets) {
      const res = await request(app).post("/tilesets").send(set);
      ids.push(res.body._id);
    }
  });

  afterAll(async () => {
    // Clean up the inserted tilesets
    for (const id of ids) {
      await request(app).delete(`/tilesets/${id}`);
    }
  });

  it("should filter by tag", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ tags: ["easy"] });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.some((ts) => ts.tags.includes("easy"))).toBe(true);
  });

  it("should filter by size", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ sizes: [4] });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].size).toBe(4);
  });

  it("should filter by minRating", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ minRating: 6 });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Gamma");
  });

  it("should filter by minPlays", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ minPlays: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.some((ts) => ts.name === "Alpha")).toBe(true);
    expect(res.body.some((ts) => ts.name === "Gamma")).toBe(true);
  });

  it("should filter by multiple fields", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ tags: ["challenge"], minRating: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Gamma");
  });

  it("should sort by rating descending", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ sort: { field: "rating", order: "desc" } });
    expect(res.statusCode).toBe(200);
    expect(res.body[0].rating).toBeGreaterThanOrEqual(res.body[1].rating);
  });

  it("should return all tilesets if filter is empty", async () => {
    const res = await request(app).post("/tilesets/search").send({});
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });

  it("should return empty array for no matches", async () => {
    const res = await request(app)
      .post("/tilesets/search")
      .send({ names: ["Nonexistent"] });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("Tilesets API - error and edge cases", () => {
  it("should not create a tileset with invalid tiles length", async () => {
    const res = await request(app)
      .post("/tilesets")
      .send({
        name: "InvalidTiles",
        description: "Invalid tiles length",
        size: 3,
        tiles: ["1", "2", "3"], // too short
        tags: ["invalid"],
      });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/Tiles array length/);
  });

  it("should return 404 for get with invalid ID", async () => {
    const res = await request(app).get("/tilesets/invalidid123");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for update with invalid ID", async () => {
    const res = await request(app)
      .put("/tilesets/invalidid123")
      .send({ description: "Should not work" });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for delete with invalid ID", async () => {
    const res = await request(app).delete("/tilesets/invalidid123");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for upvote with invalid ID", async () => {
    const res = await request(app).post("/tilesets/invalidid123/upvote");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for downvote with invalid ID", async () => {
    const res = await request(app).post("/tilesets/invalidid123/downvote");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
