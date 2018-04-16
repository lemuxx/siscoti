const proyect = require('../models/proyect');

module.exports = function(app){

  app.get('/proyects', () => {
    proyect.getProyects((err, data) => {
      res.json(data);
    });
  });

  app.post('/proyects', (req, res) => {
    const proyectData = {
      id_proyect: null,
      name_proyect: req.body.name_proyect,
      description_proyect: req.body.description_proyect,
      total_hours_proyect: req.body.total_hours_proyect,
      total_cost_proyect: req.body.total_cost_proyect
    }
    proyectData.insertProyect(proyectData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Proyect inserted',
          data: data
        })
      }else{
        succes: false,
        msg: 'Proyect not inserted',
        data: data
      }
    })
  });

  app.put('/proyects/:id_proyect', (req, res) => {
    const proyectData = {
      id_proyect: req.params.id_proyect,
      name_proyect: req.body.name_proyect,
      description_proyect: req.body.description_proyect,
      total_hours_proyect: req.body.total_hours_proyect,
      total_cost_proyect: req.body.total_cost_proyect
    }
    proyectData.updateProyect(proyectData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Proyect updated',
          data: data
        })
      }else{
        res.json({
          succes: false,
          msg: 'Proyect not updated',
          data: data
        })
      }
    })
  });

  app.put('/proyects/delete/:id_proyect', (req, res) => {
    const proyectData = {
      id_proyect: req.params.id_proyect,
      status_proyect: req.body.status_proyect
    }
    proyectData.deleteProyect(proyectData, (err, res) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'proyect removed',
          data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'proyect not removed',
          data: data
        })
      }
    })
  });
}
