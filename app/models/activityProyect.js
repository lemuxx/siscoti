const dbConnection = require("../../config/dbConnection");
const async = require("async");
let connection = dbConnection();
let activityProyectModel = {};

activityProyectModel.insertActivityProyect = (activityProyectData, callback) => {
  if(connection){
    const id_proyect = activityProyectData.id_proyect;
    const activitiesProyect = activityProyectData.activitiesProyect;
    async.forEachOf(activitiesProyect, (value, key, callback) => {
      connection.query('INSERT INTO siscoti_tb_proyect_activity SET ?',
      value,
        (err, result) => {
          if(err){
            throw err;
          }else{
            callback(null, {
              "succes": true
            })
          }
        }
      )
    }, (err) =>  {
      if(err){
          throw err;
        }else{
          callback(null, {
            "succes": true
          })
        }
    });
  }
};

module.exports = activityProyectModel;
