const dbConnection = require("../../config/dbConnection");
let connection = dbConnection();
let activityModel = {};

activityModel.getActivities = (callback) => {
  const status_activity = 1;
  if(connection){
    connection.query(
      'SELECT * FROM siscoti_tb_activity WHERE status_activity = ?', [status_activity],
      (err, rows) => {
        if(err){
          throw err;
        }
        else{
          callback(null, rows);
        }
      }
    )
  }
};

activityModel.insertActivity = (activityData, callback) => {
  if(connection){
    connection.query(
      'INSERT INTO siscoti_tb_activity SET ?',
      activityData,
      (err, result) => {
        if(err){
          throw err;
        }
        else{
          callback(null, {
            "succes": true
          })
        }
      }
    )
  }
};

activityModel.updateActivity = (activityData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_activity SET
      name_activity = ?,
      description_activity = ?
      WHERE id_activity = ?
    `
    connection.query(sql, [activityData.name_activity,
                          activityData.description_activity,
                          activityData.id_activity],
    (err, result) => {
      if(err){
        throw err;
      }
      else{
        callback(null, {
          "succes": true
        })
      }
    })
  }
};

activityModel.deleteActivity = (activityData, callback) => {
  const changeStatus = 0;
  if(connection){
    const sql = `
      UPDATE siscoti_tb_activity SET
      status_activity = ?
      WHERE id_activity = ?
    `
    connection.query(sql, [changeStatus,
                          activityData.id_activity],
    (err, result) => {
      if(err){
        throw err;
      }
      else{
        callback(null, {
          "succes": true
        })
      }
    })
  }
};

module.exports = activityModel;
