API_URL="http://localhost:3000/tilesets"

check() {
  CODE=$1
  MSG=$2
  EXPECTED=${3:-"200|201"}
  if [[ "$CODE" =~ $EXPECTED ]]; then
    echo "✅ $MSG ($CODE)"
  else
    echo "❌ $MSG ($CODE)"
  fi
}

echo "[GET] /tilesets/ (all tilesets)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/")
check "$code" "GET all tilesets"

echo "[GET] /tilesets/search/name/Animals (search by name)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/search/name/Animals")
check "$code" "GET search by name"

echo "[GET] /tilesets/search/tag/example (search by tag)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/search/tag/example")
check "$code" "GET search by tag"

echo "[GET] /tilesets/search/size/4 (search by size)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/search/size/4")
check "$code" "GET search by size"

TILESET_ID=$(curl -s "$API_URL/" | grep -o '"_id":"[^"]*"' | head -n1 | cut -d '"' -f4)
echo "Using tileset ID: $TILESET_ID"

echo "[GET] /tilesets/:id (get by id)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/$TILESET_ID")
check "$code" "GET by id"

echo "[PUT] /tilesets/:id (update by id)"
code=$(curl -s -o /dev/null -w "%{http_code}" -X PUT -H "Content-Type: application/json" -d '{"name":"Animals","description":"Updated desc","size":4,"tiles":["Cat","Dog","Hamster","Mouse","Lizard","Snake","Frog","Turtle","Parrot","Eagle","Penguin","Dolphin","Horse","Cow","Sheep","Pig"],"tags":["animals","nature","wildlife","example"]}' "$API_URL/$TILESET_ID")
check "$code" "PUT update by id"

echo "[DELETE] /tilesets/:id (delete by id, not actually deleting seed, just testing error handling)"
code=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$API_URL/000000000000000000000000")
check "$code" "DELETE by id (non-existent)" "404"


# Delete YOLO-Test tileset if it exists to avoid duplicate key error
YOLO_ID=$(curl -s "$API_URL/" | grep -o '{"_id":"[^"]*","name":"YOLO-Test"' | head -n1 | cut -d '"' -f4)
if [ -n "$YOLO_ID" ]; then
  echo "Deleting existing YOLO-Test tileset (id: $YOLO_ID)"
  curl -s -o /dev/null -X DELETE "$API_URL/$YOLO_ID"
fi

echo "[POST] /tilesets/ (create tileset)"
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{"name":"YOLO-Test","description":"Just a test","size":3,"tiles":["1","2","3","4","5","6","7","8","9"],"tags":["yolo"]}' "$API_URL/")
check "$code" "POST create tileset"


echo "YOLO tilesets route tests complete."