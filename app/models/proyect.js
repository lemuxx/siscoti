const dbConnection = require("../../config/dbConnection");
let connection = dbConnection();
let proyectModel = {};

proyectModel.getProyects = (callback) => {
  const status_proyect = 1;
  if(connection){
    connection.query(
      'SELECT * FROM siscoti_tb_proyect WHERE status_proyect = ?', [status_proyect],
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

proyectModel.insertProyect = (proyectData, callback) => {
  if(connection){
      connection.query('INSERT INTO siscoti_tb_proyect SET ?',
      proyectData,
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

proyectModel.updateProyect = (proyectData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_proyect SET
      name_proyect = ?,
      description_proyect = ?,
      total_hours_proyect = ?,
      total_cost_proyect = ?
      WHERE id_proyect = ?
    `
    connection.query(sql, [proyectData.name_proyect,
                          proyectData.description_proyect,
                          proyectData.total_hours_proyect,
                          proyectData.total_cost_proyect,
                          proyectData.id_proyect],
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

proyectModel.deleteProyect = (proyectData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_proyect SEt
      status_proyect = ?
      WHERE id_proyect = ?
    `
    connection.query(sql, [proyectData.status_proyect,
                          proyectData.id_proyect],
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

module.exports = proyectModel;
