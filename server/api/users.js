let express = require('express');

let Users = require('../models/users') ;

let router = express.Router();

console.log('Valami');


router.get('/', (req, res) => {
  Users.retrieveAll((err, cities) => {
    if (err)
      return res.json(err);
    return res.json(cities);
  });
});

router.post('/', (req, res) => {
  var user = req.body.user;

  Users.insert(user, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;