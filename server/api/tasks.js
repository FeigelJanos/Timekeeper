let express = require('express');

let Tasks = require('../models/tasks') ;

let router = express.Router();


router.get('/all/:user_id', (req, res) => {
    let id = req.params.user_id;

  Tasks.retrieveAll(id, (err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.get('/active/:user_id', (req, res) => {
  let id = req.params.user_id;

Tasks.retrieveActive(id, (err, users) => {
  if (err)
    return res.json(err);
  return res.json(users);
});
});

router.post('/insert', (req, res) => {
  let task = req.body.task_name;
  let user = req.body.user_id;

  Tasks.insert(task, user, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/delete', (req, res) => {
    let id = req.body.task_id;
  
    Tasks.delete(id, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
  });

  router.post('/activate', (req, res) => {
    let task_to_activate = req.body.toActive_id;
  
    Tasks.activate(task_to_activate, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
  });

  router.post('/deactivate', (req, res) => {
    let user = req.body.user_id;

    Tasks.deactivate(user, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });

  });

module.exports = router;