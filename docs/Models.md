# Models Documentation

## Bingofield Model (`models/Bingofield.js`)

Represents a bingo field for a user in a game.

### Fields

- **tilesetId** (`ObjectId`, required): Reference to the Tileset used for this bingofield.
- **userId** (`ObjectId`, required): Reference to the User who owns this bingofield.
- **gameId** (`ObjectId`, required): Reference to the Game this bingofield belongs to.
- **tiles** (`[String]`, required): Array of tile values for the bingo field.
- **marked** (`[Boolean]`, required): Array indicating which tiles are marked.
- **size** (`Number`, required): Size of the bingo field (e.g., 5 for a 5x5 grid).
- **isWinner** (`Boolean`, default: false): Whether this bingofield is a winner.
- **completedAt** (`Date`, optional): When the bingofield was completed.
- **timestamps**: Includes `createdAt` and `updatedAt` fields automatically.

---

## Tileset Model (`models/Tileset.js`)

Represents a set of tiles that can be used to generate bingo fields.

### Fields

- **name** (`String`, required, unique): Name of the tileset.
- **description** (`String`, required): Description of the tileset.
- **size** (`Number`, required, enum: [3, 4, 5, 6]): Size of the bingo grid this tileset is for.
- **tiles** (`[String]`, required): Array of tile values. Must be exactly `size * size` elements.
- **tags** (`[String]`, default: []): Tags for categorizing the tileset.
- **timestamps**: Includes `createdAt` and `updatedAt` fields automatically.
