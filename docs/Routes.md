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

### GET `/tilesets/search/name/:name`

- **Description:** Search tilesets by name (case-insensitive, partial match).
- **Response:** Array of matching tileset objects.

### GET `/tilesets/search/tag/:tag`

- **Description:** Search tilesets by tag (exact match).
- **Response:** Array of matching tileset objects.

### GET `/tilesets/search/size/:size`

- **Description:** Search tilesets by size (exact match).
- **Response:** Array of matching tileset objects.
