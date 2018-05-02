const dbConnection = require("../../config/dbConnection");
let connection = dbConnection();
let userModel = {};

userModel.getUsers = (callback) => {
  const status_user = 1;
  if(connection){
    connection.query(
      'SELECT * FROM siscoti_tb_user WHERE status_user = ?', [status_user],
      (err, rows) => {
        if(err){
          throw err;
        }else{
          callback(null, rows);
        }
      }
    )
  }
};

userModel.insertUser = (userData, callback) => {
  if(connection){
    connection.query(
      'INSERT INTO siscoti_tb_user SET ?',
      userData,
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

userModel.updateUser = (userData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_user SET
      name_user = ?,
      mail_user = ?,
      telephone_user = ?
    `
    connection.query(sql, [userData.name_user,
                          userData.mail_user,
                          userData.telephone_user],
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

userModel.deleteUser = (userData, callback) => {
  const changeStatus = 0;
  if(connection){
    const sql = `
      UPDATE siscoti_tb_user SEt
      status_user = ?
      WHERE id_user = ?
    `
    connection.query(sql, [changeStatus,
                          userData.id_user],
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

module.exports = userModel;
