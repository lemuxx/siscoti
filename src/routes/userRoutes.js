const user = require('../models/user');
module.exports = function (app){

	app.get('/', (req, res) => {
		user.getUsers((err, data) => {
			res.json(data);
		});
	});

	app.post('/users', (req, res) => {
		const userData = {
			id: null,
			username: req.body.username,
			mail: req.body.mail,
			pass: req.body.pass
		}
		user.insertUser(userData, (err, data) => {
			if(data && data.insertId){
				res.json({
					success: true,
					msg: 'Usuario insertado',
					data: data
				})
			}
		});

	});

	app.put('/users/:id', (req, res) => {
		const userData = {
			id: req.params.id,
			username: req.body.username,
			mail: req.body.mail,
			pass: req.body.pass
		}

		user.updateUser(userData, (err, data) => {
			if(data && data.msg){
				res.json(data);
			}
			else{
				res.json({
					success: false,
					msg: "error"
				});
			}
		})
	});
}