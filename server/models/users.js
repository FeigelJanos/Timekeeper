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

  static insert (user, callback) {
    db.query('INSERT INTO users (username) VALUES ($1)', [user], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

