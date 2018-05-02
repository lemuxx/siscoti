const user = require('../models/user');
var sha256 = require('js-sha256');

module.exports = function (app) {

  app.get('/users', (req, res) => {
    user.getUsers((err, data) => {
      res.json(data);
    })
  });

  app.post('/users', (req, res) => {
    const userData = {
      id_user: null,
      name_user: req.body.name_user,
      mail_user: req.body.mail_user,
      password_user: sha256(req.body.password_user),
      telephone_user: req.body.telephone_user
    }

    user.insertUser(userData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msh: 'User intserted',
          data: data
        })
      }else {
        res.json({
          succes: false,
          msg: 'User not inserted',
          data: data
        })
      }
    })
  });

  app.put('/users/:id_user', (req, res) => {
    const userData = {
      id_user: req.params.id_user,
      name_user: req.body.name_user,
      mail_user: req.body.mail_user,
      telephone_user: req.body.telephone_user
    }
    user.updateUser(userData, (err, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'User updated',
          data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'User not updated',
          data: data
        })
      }
    })
  });

  app.put('/users/delete/:id_user', (req, res) => {
    const userData = {
      id_user: req.params.id_user
    }
    user.deleteUser(userData, (req, data) => {
      if(data && data.succes){
        res.json({
          succes: true,
          msg: 'User removed',
          data: data
        })
      }
      else{
        res.json({
          succes: false,
          msg: 'User not removed',
          data: data
        })
      }
    })
  });



}
