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

router.post('/from', (req, res) => {
  let id = req.body.user_id;
  let from = req.body.start_date;
  

Times.fromToNow(id, from, (err, users) => {
  if (err)
    return res.json(err);
  return res.json(users);
});
});

router.post('/insert', (req, res) => {
  let time = req.body.time;
  let finished = req.body.finished;
  let task = req.body.task_id;

  Times.insert(task, time, finished, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


module.exports = router;