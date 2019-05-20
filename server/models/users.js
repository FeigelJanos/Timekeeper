const db = require('../database');


module.exports = class Users {
  static retrieveAll (callback) {
    db.query('SELECT * from users', (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }

  static retrieveUser (user, callback) {
    db.query('SELECT * FROM users WHERE user_name = $1', [user], (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }

  static insert (user, password, email, callback) {
    db.query('INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3)', [user, password, email], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static login (user, password, callback) {
    db.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [user, password], (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }

}

