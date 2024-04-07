const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const {GetObjectCommand, PutObjectCommand, S3Client} = require('@aws-sdk/client-s3');


const s3Client = new S3Client({
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
  } else {console.log('DID NOT PASS THE CHANGEFEATURE SERVER ROUTER WHITELIST CHECK'); res.json({alert: 'BAD ACTOR OH NO DO SOMETHING'})}
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
} else {console.log('DID NOT PASS THE CHANGENOTE SERVER ROUTER WHITELIST CHECK'); res.json({alert: 'BAD ACTOR OH NO DO SOMETHING'})}
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

router.get('/photo/:photoName', async (req, res) => { // MAKE SAGA AND GEAR PHOTO REDUCER??
  try {
    console.log('MADE IT TO THE SERVER SIDE GET PHOTO ROUTE--------------------------');
const myBucket = process.env.AWS_BUCKET; //BUCKET_NAME
const myKey = `gearphotos/${req.user.id}/${req.params.photoName}`; // bucketfolder/userIDfolder/file

const data = await s3Client.send(new GetObjectCommand ({
  Bucket: myBucket,
  Key: myKey,
}));
  console.log('THIS SHOULD BE THE PHOTO DATA, OR AN OBJECT CONTAINING IT?:', data);
  data.Body.pipe(res); // This .pipe gives the client side access to the photo data via
                       // path /api/user/photo/photoName, see src= attribute on <img> tags on client side
  } catch (error) {
      console.log(error)
      res.sendStatus(500);
  }
});

router.post('/photo', async (req, res) => {
  try{
    const {photoName, toolId} = req.query;
    const photoData = req.files.image.data;
  
    const metadataResponse = await s3Client.send( new PutObjectCommand({
      Bucket: 'freelancersgearschedulerbucket',
      Key: `gearphotos/${req.user.id}/${photoName}`, // bucketfolder/userIDfolder/file, MIGHT ADD TIMESTAMP HERE LATER, SEE CHRIS' VIDEO AT 1:20 MIN MARK
      Body: photoData, // photo data to upload
      // ACL: 'private'
    }));
    //URL where the file can be accessed, might need ID for private read? See Chris' video at 50 min mark
    console.log('METADATA RESPONSE ABOUT FILE BEING UPLOADED TO S3 BUCKET', metadataResponse);
  
    //Put photoName in database:
    await pool.query(`
      UPDATE "gear_list"
      SET photo = $2
      WHERE "gear_list".id = $1;
      `, [toolId, photoName]);
    //Send OK back to client side
    res.sendStatus(201);
  } catch (err) {
      console.log('Error in S3 photo server side POST router', err)
      res.sendStatus(500);
  }
});

router.post('/newgearphoto', async (req, res) => {
  try{

    console.log('IS THIS THE IMAGE DATA???:', req.files);
    console.log('IS THIS THE NAME???:', req.query.photoName);

    const photoName = req.query.photoName;
    const photoData = req.files.image.data; //OR POSSIBLY req.body.formData?? Why is this different from other sagas/server routes?
  
    const metadataResponse = await s3Client.send( new PutObjectCommand({
      Bucket: 'freelancersgearschedulerbucket',
      Key: `gearphotos/${req.user.id}/${photoName}`, // bucketfolder/userIDfolder/file, MIGHT ADD TIMESTAMP HERE LATER, SEE CHRIS' VIDEO AT 1:20 MIN MARK
      Body: photoData, // photo data to upload
      // ACL: 'private'
    }));
    console.log('SUCCESSFUL METADATA RESPONSE ABOUT FILE BEING UPLOADED TO S3 BUCKET', metadataResponse);
    res.sendStatus(200);
  } catch (err) {
      console.log('Error in S3 photo server side post newgearphoto router', err)
      res.sendStatus(500);
  }
});

router.post('/gear', (req, res) => {
  console.log('OBJECT FULL OF GEAR ENTRY DATA:', req.body);
  const queryText = `
  INSERT INTO "gear_list"
  (name, feature_1, feature_2, feature_3, feature_4, feature_5, feature_6, feature_7, feature_8,
    note_1, note_2, note_3, note_4, note_5, note_6, note_7, note_8, photo, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);
    `;
  const queryArgs = [
    req.body.name,
    req.body.feature1, req.body.feature2, req.body.feature3, req.body.feature4,
    req.body.feature5, req.body.feature6, req.body.feature7, req.body.feature8,
    req.body.note1, req.body.note2, req.body.note3, req.body.note4,
    req.body.note5, req.body.note6, req.body.note7, req.body.note8,
    req.body.photo,
    req.user.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('New gear with following data has been POSTED to database:', req.body);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in server side POST gear route:', err);
    res.sendStatus(500);
  });
});

//ALL EVENTS SERVER ROUTES ARE BELOW HERE-----------------------------------------------------------

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

router.delete('/events/:id', (req, res) => {
  const queryText = `
  DELETE FROM "event_list"
  WHERE "event_list".id = $1;
  `;
  const queryArgs = [req.params.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Event with following ID has been DELETED from DB:', req.params.id);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in DELETE event server route:', err);
    res.sendStatus(500);
  });
});

router.get('/eventtoupdate/:id', (req, res) => {
  const queryText = `
    SELECT * FROM "event_list"
    WHERE "event_list".id = $1;
  `;
  const queryArgs = [req.params.id]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Event with following ID has been fetched from DB:', req.params.id);
    if (result.rows && result.rows.length > 0) {
      //Send back an event as a single object from the result.rows array
      res.send(result.rows[0])
    } else {
      console.log('ERROR event not found');
      res.sendStatus(500)
    }
  })
  .catch((err) => {
    console.log('ERROR in GET eventToUpdate server route:', err);
    res.sendStatus(500);
  });
});

router.put('/eventChangeDetail/:id', (req, res) => {
  console.log('MADE IT TO SERVER SIDE', req.body);
  if (['detail_1', 'detail_2', 'detail_3', 'detail_4',
       'detail_5', 'detail_6', 'detail_7', 'detail_8'].indexOf(req.body.detailKey) !== -1) {
        const queryText = `
        UPDATE "event_list"
        SET ${req.body.detailKey} = $1
        WHERE "event_list".id = $2;
        `;
        const queryArgs = [req.body.detail, req.params.id]
        pool.query(queryText, queryArgs)
        .then(result => {
          console.log('Event with following ID has had detail changed to:', req.params.id, req.body.detailKey, req.body.detail);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log('ERROR in changing event detail server route:', err);
          res.sendStatus(500);
        });
  } else {console.log('DID NOT PASS THE CHANGEDETAIL SERVER ROUTER WHITELIST CHECK'); res.json({alert: 'BAD ACTOR OH NO DO SOMETHING'})}
});

router.put('/eventChangeContact/:id', (req, res) => {
  console.log('MADE IT TO SERVER SIDE', req.body);
  if (['contact_1', 'contact_2'].indexOf(req.body.contactKey) !== -1) {
        const queryText = `
        UPDATE "event_list"
        SET ${req.body.contactKey} = $1
        WHERE "event_list".id = $2;
        `;
        const queryArgs = [req.body.contact, req.params.id]
        pool.query(queryText, queryArgs)
        .then(result => {
          console.log('Event with following ID has had contact changed to:', req.params.id, req.body.contactKey, req.body.contact);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log('ERROR in changing event contact server route:', err);
          res.sendStatus(500);
        });
  } else {console.log('DID NOT PASS THE CHANGECONTACT SERVER ROUTER WHITELIST CHECK'); res.json({alert: 'BAD ACTOR OH NO DO SOMETHING'})}
});

router.put('/eventChangeName/:id', (req, res) => {
  const queryText = `
  UPDATE "event_list"
  SET name = $2
  WHERE "event_list".id = $1;
  `;
  const queryArgs = [req.params.id, req.body.newName]
  pool.query(queryText, queryArgs)
  .then(result => {
    console.log('Event with following ID has had name changed to:', req.params.id, req.body.name);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('ERROR in changing event name server route:', err);
    res.sendStatus(500);
  });
});

module.exports = router;
