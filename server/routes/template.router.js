const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

//---------------------------------------------------------------------

router.put('/gearAssignEvent/:id', (req, res) => {
  const nullOutGear1Query = `UPDATE "event_list" SET gear_1_id = null WHERE gear_1_id = $1;`;
  // const nullOutGear2Query = `UPDATE "event_list" SET gear_2_id = null WHERE gear_2_id = $1;`;
  // const nullOutGear3Query = `UPDATE "event_list" SET gear_3_id = null WHERE gear_3_id = $1;`;
  // const nullOutGear4Query = `UPDATE "event_list" SET gear_4_id = null WHERE gear_4_id = $1;`;
  // const nullOutGear5Query = `UPDATE "event_list" SET gear_5_id = null WHERE gear_5_id = $1;`;
  // const nullOutGear6Query = `UPDATE "event_list" SET gear_6_id = null WHERE gear_6_id = $1;`;
  // const nullOutGear7Query = `UPDATE "event_list" SET gear_7_id = null WHERE gear_7_id = $1;`;
  // const nullOutGear8Query = `UPDATE "event_list" SET gear_8_id = null WHERE gear_8_id = $1;`;
  
  const setGearForEventQuery = `
  UPDATE "event_list"
  SET gear_1_id = $1
  WHERE "event_list".id = $2;
  `;
  const nullOutPrevEventQuery = `
  UPDATE "gear_list"
  SET event_id = null
  WHERE event_id = $2;
  `;
  const assignEventQuery = `
  UPDATE "gear_list"
  SET event_id = $2
  WHERE "gear_list".id = $1;
  `;
  const queryArgs = [req.params.id, req.body.eventId]

  pool.query(nullOutGear1Query, queryArgs)
  .then(result => {
    pool.query(setGearForEventQuery, queryArgs)
    .then (result => {
      pool.query(nullOutPrevEventQuery, queryArgs)
      .then (result => {
        pool.query(assignEventQuery, queryArgs)
        .then(result => {
          console.log('Gear with following ID has had event_id changed to:', req.params.id, req.body.eventId);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log('ERROR in assignEventQuery in server route:', err);
          res.sendStatus(500);
        });
      })
      .catch((err) => {
        console.log('ERROR in nullOutPrevEventQuery in server route:', err);
        res.sendStatus(500);
      });
    })
    .catch((err) => {
      console.log('ERROR in setGearForEventQuery in server route:', err);
      res.sendStatus(500);
    });
  })
  .catch((err) => {
    console.log('ERROR in nullOutGear1Query in server route:', err);
    res.sendStatus(500);
  });
});



module.exports = router;
