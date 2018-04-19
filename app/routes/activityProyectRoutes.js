const activityProyect = require("../models/activityProyect");

module.exports = function(app){

  app.post('/activities_proyect/:id_proyect', (req, res) => {
    const activityProyectData = {
      id_proyect: req.params.id_proyect,
      activitiesProyect: req.body
    }
    activityProyect.insertActivityProyect(activityProyectData, (err, data) => {
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
