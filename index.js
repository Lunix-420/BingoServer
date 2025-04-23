const express = require("express");
const http = require("http");
const { initializeSocket } = require("./sockets/server"); // Import the socket logic

const app = express();
const server = http.createServer(app);

app.use(express.json()); // Middleware to parse JSON bodies

// Import and use the root route (which now includes subroutes)
const rootRoute = require("./routes");
app.use("/", rootRoute);

// Initialize the Socket.IO server
initializeSocket(server);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
