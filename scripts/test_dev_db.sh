#!/bin/bash

PORT=42069
DB_NAME="test_db_check"
COLLECTION_NAME="ping"
MONGO_CMD=""

# Check for mongosh or mongo
if command -v mongosh &> /dev/null; then
    MONGO_CMD="mongosh"
elif command -v mongo &> /dev/null; then
    MONGO_CMD="mongo"
else
    echo "❌ Neither mongosh nor mongo found. Please install MongoDB shell tools."
    exit 1
fi

echo "🔍 Testing MongoDB on port $PORT..."

# Run the MongoDB commands non-interactively with `--eval`
$MONGO_CMD --quiet --port $PORT --eval "
  db = connect('mongodb://localhost:$PORT/$DB_NAME');
  db.$COLLECTION_NAME.insertOne({ test: 'ok' });
  const result = db.$COLLECTION_NAME.findOne({ test: 'ok' });
  if (result && result.test === 'ok') {
      print('✅ MongoDB test passed.');
  } else {
      print('❌ MongoDB test failed.');
  }
  db.$COLLECTION_NAME.drop();
"
