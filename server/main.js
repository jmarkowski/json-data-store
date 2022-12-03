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

app.route('/api/:resource')
  .get(async (req, res) => {
    // Retrieve all data items
    console.log(`GET ${req.url} (not implemented)`);
    res.status(200).end();
  })
  .post(async (req, res) => {
    // Add one data item
    console.log(`POST ${req.url} (not implemented)`);
    res.status(200).end();
  })
  .delete(async (req, res) => {
    // Delete all data items
    console.log(`DELETE ${req.url} (not implemented)`);
    res.status(200).end();
  });

app.route('/api/:resource/:resourceId')
  .get(async (req, res) => {
    // Retrieve one data item
    console.log(`GET ${req.url} (not implemented)`);
    res.status(200).end();
  })
  .patch(async (req, res) => {
    // Update one data item
    console.log(`PATCH ${req.url} (not implemented)`);
    res.status(200).end();
  })
  .put(async (req, res) => {
    // Replace one data item
    console.log(`PUT ${req.url} (not implemented)`);
    res.status(200).end();
  })
  .delete(async (req, res) => {
    // Delete one data item
    console.log(`DELETE ${req.url} (not implemented)`);
    res.status(200).end();
  })

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
