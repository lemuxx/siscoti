const dbConnection = require("../../config/dbConnection");
let connection = dbConnection();
let projectModel = {};

projectModel.getProjects = (callback) => {
  const status_project = 1;
  if(connection){
    connection.query(
      'SELECT * FROM siscoti_tb_project WHERE status_project = ?', [status_project],
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

projectModel.insertProject = (projectData, callback) => {
  if(connection){
      connection.query('INSERT INTO siscoti_tb_project SET ?',
      projectData,
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

projectModel.updateProject = (projectData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_project SET
      name_project = ?,
      description_project = ?,
      total_hours_project = ?,
      total_cost_project = ?
      WHERE id_project = ?
    `
    connection.query(sql, [projectData.name_project,
                          projectData.description_project,
                          projectData.total_hours_project,
                          projectData.total_cost_project,
                          projectData.id_project],
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

projectModel.deleteProject = (projectData, callback) => {
  if(connection){
    const sql = `
      UPDATE siscoti_tb_project SEt
      status_project = ?
      WHERE id_project = ?
    `
    connection.query(sql, [projectData.status_project,
                          projectData.id_project],
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

module.exports = projectModel;
