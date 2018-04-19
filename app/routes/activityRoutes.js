const activity = require('../models/activity');

module.exports = function(app){

  app.get('/activities', (req, res) => {
    activity.getActivities((err, data) => {
      res.json(data);
    });
  });

  app.post('/activities', (req, res) => {
    const activityData = {
      id_activity: null,
      name_activity: req.body.name_activity,
      description_activity: req.body.description_activity,
      id_phase: req.body.id_phase
    }
    activity.insertActivity(activityData, (err, data) => {
      if(data && data.succes){
        res.json({
        succes: true,
        msg: 'Activity inserted',
        data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'Activity not inserted',
          data: data
        })
      }
    })
  });

  app.put('/activities/:id_activity', (req, res) => {
    const activityData = {
      id_activity: req.params.id_activity,
      name_activity: req.body.name_activity,
      description_activity: req.body.description_activity,
      id_phase: req.body.id_phase
    }
    console.log(activityData);
    activity.updateActivity(activityData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Activity updated',
          data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'Activity not updated',
          data: data
        })
      }
    })
  });

  app.put('/activities/delete/:id_activity', (req, res) => {
    const activityData = {
      id_activity: req.params.id_activity,
    }
    activity.deleteActivity(activityData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Activity removed',
          data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'Activity not removed',
          data: data
        })
      }
    })
  });
}
