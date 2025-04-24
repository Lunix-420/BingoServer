API_URL="http://localhost:3000/bingofields"

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

echo "[GET] /bingofields/ (all bingofields)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/")
check "$code" "GET all bingofields"

# Try to get a bingofield by userId and gameId (using first found IDs)
USER_ID=$(curl -s "$API_URL/" | grep -o '"userId":"[^"]*"' | head -n1 | cut -d '"' -f4)
GAME_ID=$(curl -s "$API_URL/" | grep -o '"gameId":"[^"]*"' | head -n1 | cut -d '"' -f4)

if [ -n "$USER_ID" ]; then
  echo "[GET] /bingofields/search/user/:userId (search by userId)"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/search/user/$USER_ID")
  check "$code" "GET search by userId"
fi

if [ -n "$GAME_ID" ]; then
  echo "[GET] /bingofields/search/game/:gameId (search by gameId)"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/search/game/$GAME_ID")
  check "$code" "GET search by gameId"
fi

BINGOFIELD_ID=$(curl -s "$API_URL/" | grep -o '"_id":"[^"]*"' | head -n1 | cut -d '"' -f4)
echo "Using bingofield ID: $BINGOFIELD_ID"

echo "[GET] /bingofields/:id (get by id)"
code=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/$BINGOFIELD_ID")
check "$code" "GET by id"

echo "[PUT] /bingofields/:id (update by id)"
code=$(curl -s -o /dev/null -w "%{http_code}" -X PUT -H "Content-Type: application/json" -d '{"tilesetId":"000000000000000000000000","userId":"000000000000000000000000","gameId":"000000000000000000000000","tiles":["A","B","C"],"marked":[false,false,false],"size":3,"isWinner":false}' "$API_URL/$BINGOFIELD_ID")
check "$code" "PUT update by id"

echo "[DELETE] /bingofields/:id (delete by id, not actually deleting seed, just testing error handling)"
code=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$API_URL/000000000000000000000000")
check "$code" "DELETE by id (non-existent)" "404"

# Delete YOLO-Test bingofield if it exists to avoid duplicate key error
YOLO_ID=$(curl -s "$API_URL/" | grep -o '{"_id":"[^"]*","tilesetId":"000000000000000000000000"' | head -n1 | cut -d '"' -f4)
if [ -n "$YOLO_ID" ]; then
  echo "Deleting existing YOLO-Test bingofield (id: $YOLO_ID)"
  curl -s -o /dev/null -X DELETE "$API_URL/$YOLO_ID"
fi

echo "[POST] /bingofields/ (create bingofield)"
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{"tilesetId":"000000000000000000000000","userId":"000000000000000000000000","gameId":"000000000000000000000000","tiles":["A","B","C"],"marked":[false,false,false],"size":3,"isWinner":false}' "$API_URL/")
check "$code" "POST create bingofield"

echo "Bingofields route tests complete."
