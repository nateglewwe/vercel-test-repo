const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

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
