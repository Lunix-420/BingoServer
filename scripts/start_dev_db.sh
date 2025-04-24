#!/bin/bash

DB_PATH="./data/db"
PORT=42069

# Create the db folder if it doesn't exist
mkdir -p "$DB_PATH"

# Check if something's already running on the target port
if lsof -i tcp:$PORT >/dev/null; then
  echo "❌ Port $PORT is already in use. Maybe MongoDB is already running?"
  echo "👉 You can stop it with: kill -9 \$(lsof -t -i tcp:$PORT)"
  exit 1
fi

# Start MongoDB
echo "🚀 Starting MongoDB on port $PORT..."
mongod --dbpath "$DB_PATH" --port $PORT
