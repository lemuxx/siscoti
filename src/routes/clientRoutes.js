const client = require('../models/client');

module.exports = function (app){

	app.get('/', (req, res) => {
		client.getClients((err, data) => {
			res.json(data);
		});
	});

	app.post('/clients', (req, res) => {
		const clientData = {
			id_client: null,
			name_client: req.body.name_client,
			mail_client: req.body.mail_client,
			telephone_client: req.body.telephone_client
		}
		client.insertClient(clientData, (err, data) => {
			if(data && data.insertId){
				res.json({
					success: true,
					msg: 'Usuario insertado',
					data: data
				})
			}
		})
	});

	app.put('/clients/:id_client', (req, res) => {
		const clientData = {
			id_client: req.params.id_client,
			name_client: req.body.name_client,
			mail_client: req.body.mail_client,
			telephone_client: req.body.telephone_client
		}

		client.updateClient(clientData, (err, data) => {
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
