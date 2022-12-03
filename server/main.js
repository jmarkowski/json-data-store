import express from 'express';
import mongoose from 'mongoose';

const app = express();

const mongoUrl = 'mongodb://root:foobar@mongo_db:27017';
const dbName = 'storeDB';
const dbUri = `${mongoUrl}/${dbName}?authSource=admin`;

mongoose.connect(dbUri);

app.get('/', (req, res) => {
  res.send('JSON Data Store server running ...');
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
