const db = require('../database');

module.exports = class Times {
  static retrieveAll (user, callback) {
    db.query('SELECT logs.log_date, logs.log_time, logs.task_id, tasks.task_name, tasks.user_id FROM logs JOIN tasks ON logs.task_id = tasks.task_id WHERE tasks.user_id = $1', [user], (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }

  static fromToNow (user, from, callback) {
    db.query('SELECT logs.log_date, logs.log_time, logs.task_id, tasks.task_name, tasks.user_id FROM logs JOIN tasks ON logs.task_id = tasks.task_id WHERE tasks.user_id = $1 AND logs.log_date >= $2', [user, from], (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }


  static insert (task, time, finished, callback) {
    db.query('INSERT INTO logs (task_id, log_time, finished, log_date) VALUES ($1, $2, $3, DEFAULT)', [task, time, finished], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


 }
