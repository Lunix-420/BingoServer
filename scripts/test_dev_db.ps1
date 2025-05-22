$PORT = 42069
$DB_NAME = "test_db_check"
$COLLECTION_NAME = "ping"
$MONGO_CMD = $null

# Check for mongosh or mongo
if (Get-Command mongosh -ErrorAction SilentlyContinue) {
    $MONGO_CMD = "mongosh"
} elseif (Get-Command mongo -ErrorAction SilentlyContinue) {
    $MONGO_CMD = "mongo"
} else {
    Write-Host "❌ Neither mongosh nor mongo found. Please install MongoDB shell tools."
    exit 1
}

Write-Host "🔍 Testing MongoDB on port $PORT..."

# MongoDB JS code to run
$mongoScript = @"
db = connect('mongodb://localhost:$PORT/$DB_NAME');
db.$COLLECTION_NAME.insertOne({ test: 'ok' });
const result = db.$COLLECTION_NAME.findOne({ test: 'ok' });
if (result && result.test === 'ok') {
    print('✅ MongoDB test passed.');
} else {
    print('❌ MongoDB test failed.');
}
db.$COLLECTION_NAME.drop();
"@

# Run the MongoDB commands non-interactively
& $MONGO_CMD --quiet --port $PORT --eval $mongoScript