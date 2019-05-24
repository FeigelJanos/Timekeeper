const db = require('../database');
let bcrypt = require('bcrypt');

module.exports = class Users {
  static retrieveAll (callback) {
    db.query('SELECT * from users', (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }

  static login (user, password, callback) {
    db.query('SELECT * FROM users WHERE user_name = $1', [user], (err, res) => {
      let hash = res[0].password;
      let error = {error: "Wrong username or password"};
            if (err.error){
        return callback(err);
      }

      bcrypt.compare(password, hash, function(err, response) {
       if (response){
        callback(res );
       }
       else{
         callback(error)
        }
        
      })
    });
  }

  static insert (user, password, email, callback) {
    db.query('INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3)', [user, password, email], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

}

