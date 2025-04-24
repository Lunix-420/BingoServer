# How to run

## 1. Install MongoDB Community Edition

- Follow the instructions for your operating system:
  
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

## 2. Install dependencies

```bash
npm install
```

## 3. Setup MongoDB

- Inside this repository, run our helper script to create a MongoDB database and collection:

```bash
bash ./scripts/setup_dev_db.sh
```

This will setup the DB in ./data/db and start the MongoDB server.

## 4. Run the server

- While step 3 will start the MongoDB server, you can also run it if it's already setup:

```bash
bash ./scripts/start_dev_db.sh
```

## 5. Test the DB connection

- In a different terminal session, run the following command to test the connection to the MongoDB server:

```bash
node ./scripts/test_dev_db.sh
```

## 6. Fill the DB with test data

- You can generate test data using the following scripts:

```bash
node ./scripts/seed_tilesets.js
```

# 7. Start the server

- Finally, start the server:

```bash
node index.js
```

- The server will be running at http://localhost:3000
