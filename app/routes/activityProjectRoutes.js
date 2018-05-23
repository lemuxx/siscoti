const activityProject = require("../models/activityproject");

module.exports = function(app){

  app.post('/activities_project/:id_project', (req, res) => {
    const activityProjectData = {
      id_project: req.params.id_project,
      activitiesProject: req.body
    }
    activityProject.insertActivityProject(activityProjectData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: "Activity inserted",
          data: data
        });
      }else{
        res.json({
          succes: false,
          msg: "Activity not inserted",
          data: data
        })
      }
    })
  });

}
