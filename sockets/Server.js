const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Handle room joining
    socket.on("joinRoom", (roomHash) => {
      socket.join(roomHash);
      console.log(`Socket ${socket.id} joined room ${roomHash}`);
      socket.emit("joinedRoom", roomHash);
    });

    // Handle room leaving
    socket.on("leaveRoom", (roomHash) => {
      socket.leave(roomHash);
      console.log(`Socket ${socket.id} left room ${roomHash}`);
      socket.emit("leftRoom", roomHash);
    });

    // Broadcast game state update to the room
    socket.on("updateGameState", ({ roomHash, gameState }) => {
      console.log(`Game state update from ${socket.id} to room ${roomHash}`);
      socket.to(roomHash).emit("gameStateUpdated", gameState);
    });

    // Handle player disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

module.exports = { initializeSocket };
