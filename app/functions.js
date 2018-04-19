const dbConnection = require("../config/dbConnection");
let sync = require('synchronize');
let connection = dbConnection();
let functions = {};

functions.numberOfPhasesFunction = (callback) => {
  let aux;
  if(connection){
    connection.query(
      'SELECT count(*) from siscoti_tb_phase;',
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
}



module.exports = functions;
