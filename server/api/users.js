let express = require('express');

let Users = require('../models/users') ;

let router = express.Router();


router.get('/all', (req, res) => {
  Users.retrieveAll((err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.get('/', (req, res) => {
  let user = req.body.user_name;
  Users.retrieveUser(user, (err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.post('/insert', (req, res) => {
  let user = req.body.user_name;
  let password = req.body.password;
  let email = req.body.email;

  Users.insert(user, password, email, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/login', (req, res) => {
  let user = req.body.user_name;
  let password = req.body.password;

  Users.login(user, password, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;