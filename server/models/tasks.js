const db = require('../database');

module.exports = class Tasks {
  static retrieveAll (user, callback) {
    db.query('SELECT * from tasks  WHERE user_id = $1', [user], (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }

  static retrieveActive (user, callback) {
    db.query('SELECT * from tasks  WHERE user_id = $1 AND active = true', [user], (err, res) => {
      if (err.error){
        return callback(err);
      }
      callback(res);
    });
  }


  static insert (task, user, callback) {
    db.query('INSERT INTO tasks (task_name, user_id) VALUES ($1, $2)', [task, user], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


  static delete (id,  callback) {
    db.query('DELETE FROM tasks WHERE task_id = $1', [id], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static activate (activate, callback) {
    db.query('UPDATE tasks SET active = true WHERE task_id = $1;', [activate], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static deactivate (user, callback) {
    db.query('UPDATE tasks SET active = false WHERE user_id = $1 AND active = true', [user], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

}
