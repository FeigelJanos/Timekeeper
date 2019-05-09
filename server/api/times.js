let express = require('express');

let Times = require('../models/times') ;

let router = express.Router();


router.get('/all', (req, res) => {
    let id = req.body.user_id;

  Times.retrieveAll(id, (err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.get('/from', (req, res) => {
  let id = req.body.user_id;
  let from = req.body.start_date;
  

Times.fromToNow(id, from, (err, users) => {
  if (err)
    return res.json(err);
  return res.json(users);
});
});

router.post('/insert', (req, res) => {
  let time = 'interval "+00:00:00"';
  let task = req.body.task_id;

  Times.insert(task, time, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/addTime', (req, res) => {
  let time = req.body.log_time;
  let task = req.body.task_id;
  
    Times.addTime(task, time, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
  });

module.exports = router;