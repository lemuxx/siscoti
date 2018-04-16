const phase = require('../models/phase');

module.exports = function(app){

  app.get('/phases', (req, res) => {
    phase.getPhases((err, data) => {
        res.json(data);
    });
  });

  app.post('/phases', (req, res) => {
    const phaseData = {
      id_phase: null,
      name_phase: req.body.name_phase,
      description_phase: req.body.description_phase
    }
    console.log(phaseData);
    phase.insertPhase(phaseData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Phase inserted',
          data: data
        })
      }else{
        res.json({
          succes: false,
          msg: 'Phase not inserted',
          data: data
        })
      }
    })
  });

  app.put('/phases/:id_phase', (req, res) => {
    const phaseData = {
      id_phase: req.params.id_phase,
      name_phase: req.body.name_phase,
      description_phase: req.body.description_phase
    }
    phase.updatePhase(phaseData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Phase updated',
          data: data
        })
      }else{
        res.json({
          succes: false,
          msg: 'Phase not updated',
          data: data
        })
      }
    })
  });

  app.put('/phases/delete/:id_phase', (req, res) => {
    const phaseData = {
      id_phase: req.params.id_phase
    }
    phase.deletePhase(phaseData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'Phase removed',
          data: data
        })
      }else {
        res.json({
          succes: false,
          msg: 'Phase not removed',
          data: data
        })
      }
    })
  });
}
