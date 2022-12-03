import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('JSON Data Store server running ...');
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
