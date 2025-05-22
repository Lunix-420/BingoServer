# API Routes Documentation

## Echo Routes (`/echo`)

### GET `/echo/:text`

-- **Description:** Echo the provided text.
-- **Response:** JSON object with the echoed text.

## Tilesets Routes (`/tilesets`)

### GET `/tilesets/`

- **Description:** Get all tilesets.
- **Response:** Array of tileset objects.

### POST `/tilesets/`

- **Description:** Create a new tileset.
- **Body:** Tileset data (JSON).
- **Response:** Created tileset object.

### GET `/tilesets/:id`

- **Description:** Get a tileset by its ID.
- **Response:** Tileset object or 404 if not found.

### PUT `/tilesets/:id`

- **Description:** Update a tileset by its ID.
- **Body:** Updated tileset data (JSON).
- **Response:** Updated tileset object or 404 if not found.

### DELETE `/tilesets/:id`

- **Description:** Delete a tileset by its ID.
- **Response:** Deleted tileset object or 404 if not found.

### POST `/tilesets/search`

- **Description:** Search tilesets by filter. Accepts a JSON body with nullable lists for `names`, `tags`, and `sizes`, a nullable integer for `minRating`, and an optional `sort` object. If a list is null or empty, that filter is ignored. If `minRating` is null or not provided, it is ignored. If the body is empty, all tilesets are returned. If `sort` is provided, results are sorted accordingly.
- **Body Example:**
  ```json
  {
    "names": ["Animals", "Plants"],
    "tags": ["nature", "wildlife"],
    "sizes": [4, 5],
    "minRating": 1000,
    "sort": { "field": "rating", "order": "desc" }
  }
  ```
- **Sort Fields:** `name`, `size`, `rating`, `createdAt` (default: `createdAt` descending)
- **Sort Order:** `asc` or `desc`
- **Response:** Array of matching tileset objects.

### POST `/tilesets/:id/upvote`

- **Description:** Upvote a tileset (increment its rating by 1).
- **Response:** Updated tileset object or 404 if not found.

### POST `/tilesets/:id/downvote`

- **Description:** Downvote a tileset (decrement its rating by 1).
- **Response:** Updated tileset object or 404 if not found.

## Bingofields Routes (`/bingofields`)

### GET `/bingofields/`

- **Description:** Get all bingofields.
- **Response:** Array of bingofield objects.

### POST `/bingofields/`

- **Description:** Create a new bingofield.
- **Body:** Bingofield data (JSON).
- **Response:** Created bingofield object.

### GET `/bingofields/:id`

- **Description:** Get a bingofield by its ID.
- **Response:** Bingofield object or 404 if not found.

### PUT `/bingofields/:id`

- **Description:** Update a bingofield by its ID.
- **Body:** Updated bingofield data (JSON).
- **Response:** Updated bingofield object or 404 if not found.

### DELETE `/bingofields/:id`

- **Description:** Delete a bingofield by its ID.
- **Response:** Deleted bingofield object or 404 if not found.

### GET `/bingofields/search/user/:userId`

- **Description:** Get all bingofields for a specific user.
- **Response:** Array of bingofield objects for the user.

### GET `/bingofields/search/game/:gameId`

- **Description:** Get all bingofields for a specific game.
- **Response:** Array of bingofield objects for the game.
