import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

const mongoUrl = 'mongodb://root:foobar@mongo_db:27017';
const dbName = 'storeDB';
const dbUri = `${mongoUrl}/${dbName}?authSource=admin`;

mongoose.connect(dbUri);

const dataSchema = {
  resource: String,
  data: Object,
}

const Data = mongoose.model('Data', dataSchema);

app.get('/', (req, res) => {
  res.send('JSON Data Store server running ...');
});

app.route('/api/:resource')
  .get(async (req, res) => {
    // Retrieve all data items
    console.log(`GET ${req.url}`);

    const resource = req.params.resource;

    try {
      const data = await Data.find({ resource: resource });
      res.send(data);
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    };
  })
  .post(async (req, res) => {
    // Add one data item
    console.log(`POST ${req.url}: ${JSON.stringify(req.body)}`);

    const resource = req.params.resource;

    const newData = new Data({
      resource: resource,
      data: req.body,
    });

    try {
      const doc = await newData.save();
      const loc = `${req.url}/${doc._id}`;

      // Set the Location HTTP header
      res.header('Location', loc);
      res.status(201).json(doc);
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    };
  })
  .delete(async (req, res) => {
    // Delete all data items
    console.log(`DELETE ${req.url}`);

    const resource = req.params.resource;

    try {
      await Data.deleteMany({ resource: resource });
      res.status(200).end();
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    }
  });

app.route('/api/:resource/:resourceId')
  .get(async (req, res) => {
    // Retrieve one data item
    console.log(`GET ${req.url}`);

    const resource = req.params.resource;
    const resourceId = req.params.resourceId;

    if (!mongoose.isObjectIdOrHexString(resourceId)) {
      res.status(400).end();
    }

    try {
      // Technically only need the resource ID, but for completeness add the
      // resource path as well.
      const data = await Data.findOne({
        resource: resource,
        _id: resourceId,
      });
      res.send(data);
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    }
  })
  .patch(async (req, res) => {
    // Update one data item
    console.log(`PATCH ${req.url}: ${JSON.stringify(req.body)}`);

    const resource = req.params.resource;
    const resourceId = req.params.resourceId;

    if (!mongoose.isObjectIdOrHexString(resourceId)) {
      res.status(400).end();
    }

    try {
      const update = {
        $set: {
          data: req.body,
        }
      }

      await Data.findOneAndUpdate({
        resource: resource,
        _id: resourceId,
      }, update, { upsert: true}).exec();
      res.status(200).end();
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    }
  })
  .put(async (req, res) => {
    // Replace one data item
    console.log(`PUT ${req.url}: ${JSON.stringify(req.body)}`);

    const resource = req.params.resource;
    const resourceId = req.params.resourceId;

    if (!mongoose.isObjectIdOrHexString(resourceId)) {
      res.status(400).end();
    }

    const newData = {
      resource: resource,
      data: req.body,
    };

    try {
      await Data.findOneAndReplace({
        resource: resource,
        _id: resourceId,
      }, newData);
      res.status(200).end();
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    }
  })
  .delete(async (req, res) => {
    // Delete one data item
    console.log(`DELETE ${req.url}`);

    const resource = req.params.resource;
    const resourceId = req.params.resourceId;

    if (!mongoose.isObjectIdOrHexString(resourceId)) {
      res.status(400).end();
    }

    try {
      await Data.deleteOne({
        resource: resource,
        _id: resourceId,
      });
      res.send(200).end();
    } catch (err) {
      res.status(200).json({
        'error': err.message,
      });
    }
  })

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
