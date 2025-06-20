const express = require("express");
const http = require("http");
const { initializeSocket } = require("./sockets/Server");
const { connectToMongo } = require("./db/Mongo");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectToMongo();

app.use(express.json());
app.use(cors());

// Import and use the root route (which now includes subroutes)
const rootRoute = require("./routes/Router.js");
app.use("/", rootRoute);

// Initialize the Socket.IO server
initializeSocket(server);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
