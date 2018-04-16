const dbConnection = require("../../config/dbConnection");
let connection = dbConnection();
let phaseModel = {};

phaseModel.getPhases = (callback) => {
  const status_phase = 1;
  if(connection){
    connection.query(
      'SELECT * FROM siscoti_tb_phase WHERE status_phase = ?', [status_phase],
      (err, rows) => {
        if(err){
          throw err;
        }
        else {
          callback(null, rows);
        }
      }
    );
  }
};

phaseModel.insertPhase = (phaseData, callback) => {
  if(connection){
    connection.query(
      'INSERT INTO siscoti_tb_phase SET ?',
      phaseData,
      (err, result) => {
        if(err){
          throw err;
        }
        else {
          callback(null, {
            'succes': true
          });
        }
      }
    );
  }
};

phaseModel.updatePhase = (phaseData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_phase SET
      name_phase = ?,
      description_phase = ?
      WHERE id_phase = ?
    `
    connection.query(sql, [phaseData.name_phase,
                          phaseData.description_phase,
                          phaseData.id_phase],
    (err, result) => {
      if(err){
        throw err;
      }
      else{
        callback(null,{
          'succes': true
        });
      }
    })
  }
};

phaseModel.deletePhase = (phaseData, callback) => {
  const changeStatus = 0;
  if(connection){
    const sql = `
      UPDATE siscoti_tb_phase SET
      status_phase = ?
      WHERE id_phase = ?
    `
    connection.query(sql, [changeStatus,
                          phaseData.id_phase],
    (err, result) => {
      if(err){
        throw err;
      }
      else {
        callback(null,{
          'succes': true
        });
      }
    })
  }
};

module.exports = phaseModel;
