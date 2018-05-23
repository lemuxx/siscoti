const project = require('../models/project');

module.exports = function(app){

  app.get('/projects', (req, res) => {
    project.getProjects((err, data) => {
      res.json(data);
    });
  });

  app.post('/projects', (req, res) => {
    const projectData = {
      id_project: null,
      name_project: req.body.name_project,
      description_project: req.body.description_project,
      total_hours_project: req.body.total_hours_project,
      total_cost_project: req.body.total_cost_project,
      id_client: req.body.id_client
    }
    project.insertProject(projectData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'project inserted',
          data: data
        })
      }else{
        res.json({
          succes: false,
          msg: 'project not inserted',
          data: data
        })
      }
    })
  });

  app.put('/projects/:id_project', (req, res) => {
    const projectData = {
      id_project: req.params.id_project,
      name_project: req.body.name_project,
      description_project: req.body.description_project,
      total_hours_project: req.body.total_hours_project,
      total_cost_project: req.body.total_cost_project,
      id_client: req.body.id_client
    }
    project.updateProject(projectData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'project updated',
          data: data
        })
      }else{
        res.json({
          succes: false,
          msg: 'project not updated',
          data: data
        })
      }
    })
  });

  app.put('/projects/delete/:id_project', (req, res) => {
    const projectData = {
      id_project: req.params.id_project,
      status_project: req.body.status_project
    }
    project.deleteProject(projectData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'project removed',
          data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'project not removed',
          data: data
        })
      }
    })
  });
}
