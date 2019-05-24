let express = require('express');

let Users = require('../models/users') ;

let router = express.Router();

let bcrypt = require('bcrypt');


/*function checkPassword(result, password){
    hash = result[0].password;
    console.log(hash, password)

  bcrypt.compare(password, hash, function(err, res) {
      return res;
});
}*/

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
  let password = req.body.password;
  let user = req.body.user_name;
  let email = req.body.email;

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      Users.insert(user, hash, email, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
      });
    });
  });

 
});

router.post('/login', (req, res) => {
  let user = req.body.user_name;
  let password = req.body.password;
 
  Users.login(user, password, (err, result) => {
    if (err){
      return res.json(err);
    }
      return res.json(result);
  });
});

module.exports = router;