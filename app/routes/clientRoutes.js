const client = require('../models/client');

module.exports = function (app){

	app.get('/clients', (req, res) => {
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
			if(data && data.succes){
				res.json({
					success: true,
					msg: 'client inserted',
					data: data
				})
			}else{
				res.json({
					success: false,
					msg: 'Client not inserted',
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
			if(data && data.succes){
				res.json({
					success: true,
					msg: 'Client updated',
					data: data
				})
			}
			else{
				res.json({
					success: false,
					msg: 'Client not updated',
					data: data
				})
			}
		})
	});
	app.put('/clients/delete/:id_client', (req, res) => {
		const clientData = {
			id_client: req.params.id_client
		}
		client.deleteClient(clientData, (err, data) => {
			if(data && data.succes){
				res.json({
					succes: true,
					msg: 'Client removed',
					data: data
				})
			}
			else{
				res.json({
					succes: true,
					msg: 'Client not removed',
					data: data
				})
			}
		})
	});
}
