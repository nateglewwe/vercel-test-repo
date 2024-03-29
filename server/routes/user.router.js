const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const aws = require('aws-sdk');

const s3Client = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/gear', (req, res) => {
  const queryText = `
    SELECT * FROM "gear_list"
    WHERE "gear_list".user_id = $1
    ORDER BY "name" ASC;
  `;
  const queryArgs = [req.user.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Single users gear has been fetched from DB and sent to client-side:', result.rows);
    // This returns the gear as an array of objects
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR in GET gear server route', err);
    res.sendStatus(500)
  })
});

router.get('/geartoupdate/:id', (req, res) => {
  const queryText = `
    SELECT * FROM "gear_list"
    WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Piece of gear with following ID has been fetched from DB:', req.params.id);
    if (result.rows && result.rows.length > 0) {
      //Send back a piece of gear as a single object from the result.rows array
      res.send(result.rows[0])
    } else {
      console.log('ERROR: gear not found');
      res.sendStatus(500)
    }
  })
  .catch((err) => {
    console.log('ERROR in GET gearToUpdate server route:', err);
    res.sendStatus(500);
  });
});

router.delete('/gear/:id', (req, res) => {
  const queryText = `
  DELETE FROM "gear_list"
  WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Gear with following ID has been DELETED from DB:', req.params.id);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in DELETE gear server route:', err);
    res.sendStatus(500);
  });
});

router.put('/gearPhotoDelete/:id', (req, res) => {
  const queryText = `
  UPDATE "gear_list"
  SET photo = null
  WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Gear with following ID has had photo deleted from DB:', req.params.id);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in deleting gear photo server route:', err);
    res.sendStatus(500);
  });
});

router.put('/gearChangeName/:id', (req, res) => {
  const queryText = `
  UPDATE "gear_list"
  SET name = $2
  WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id, req.body.newName]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Gear with following ID has had name changed to:', req.params.id, req.body.name);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in changing gear name server route:', err);
    res.sendStatus(500);
  });
});

router.put('/gearChangeFeature/:id', (req, res) => {
  console.log('MADE IT TO SERVER SIDE', req.body);
  if (['feature_1', 'feature_2', 'feature_3', 'feature_4',
       'feature_5', 'feature_6', 'feature_7', 'feature_8'].indexOf(req.body.featureKey) !== -1) {
        const queryText = `
        UPDATE "gear_list"
        SET ${req.body.featureKey} = $1
        WHERE "gear_list".id = $2;
        `;
        const queryArgs = [req.body.feature, req.params.id]
        pool.query(queryText, queryArgs)
        .then(result => {
          console.log('Gear with following ID has had feature changed to:', req.params.id, req.body.featureKey, req.body.feature);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log('ERROR in changing gear feature server route:', err);
          res.sendStatus(500);
        });
  } else {console.log('DID NOT PASS THE SERVER ROUTER WHITELIST CHECK'); res.json({alert: 'BAD ACTOR OH NO DO SOMETHING'})}
});

router.put('/gearChangeNote/:id', (req, res) => {
  if (['note_1', 'note_2', 'note_3', 'note_4',
       'note_5', 'note_6', 'note_7', 'note_8'].indexOf(req.body.noteKey) !== -1) {


  const queryText = `
  UPDATE "gear_list"
  SET ${req.body.noteKey} = $2
  WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id, req.body.note]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Gear with following ID has had note changed to:', req.params.id, req.body.featureKey, req.body.feature);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in changing gear note server route:', err);
    res.sendStatus(500);
  });
} else {console.log('DID NOT PASS THE SERVER ROUTER WHITELIST CHECK'); res.json({alert: 'BAD ACTOR OH NO DO SOMETHING'})}
});

router.put('/gearAssignEvent/:id', (req, res) => {
  const queryText = `
  UPDATE "gear_list"
  SET event_id = $2
  WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id, req.body.eventId]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Gear with following ID has had event_id changed to:', req.params.id, req.body.eventId);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in assigning gear to event server route:', err);
    res.sendStatus(500);
  });
});

router.post('/photo', async (req, res) => {
  try{
    const {photoName} = req.query;
    const photoData = req.files.image.data;
  
    const uploadedFile = await s3Client.upload({
      Bucket: 'freelancersgearschedulerbucket',
      Key: `gearphotos/${photoName}`, // folder/file
      Body: photoData, // photo data to upload
      // ACL: 'private'
    }).promise();
    //URL where the file can be accessed, might need ID for private read? See Chris' video at 50 min mark
    console.log('URL WHERE FILE WAS UPLOADED?', uploadedFile.Location);
  
    //TODO: put URL in database!
  
    res.sendStatus(201);
  } catch (err) {
      console.log('Error in S3 photo server side POST router', err)
      res.sendStatus(500);
  }
});

router.get('/events', (req, res) => {
  const queryText = `
    SELECT * FROM "event_list"
    WHERE "event_list".user_id = $1
    ORDER BY "name" ASC;
  `;
  const queryArgs = [req.user.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Single users events have been fetched from DB and sent to client-side:', result.rows);
    // This returns the events as an array of objects
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR in GET events server route', err);
    res.sendStatus(500)
  })
});

module.exports = router;
