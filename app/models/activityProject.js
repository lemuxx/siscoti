const dbConnection = require("../../config/dbConnection");
const async = require("async");
let connection = dbConnection();
let activityProjectModel = {};

activityProjectModel.insertActivityProject = (activityProjectData, callback) => {
  if(connection){
    const id_project = activityProjectData.id_project;
    const activitiesProject = activityProjectData.activitiesProject;
    async.forEachOf(activitiesProject, (value, key, callback) => {
      connection.query('INSERT INTO siscoti_tb_project_activity SET ?',
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

module.exports = activityProjectModel;
