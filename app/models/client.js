const dbConnection = require('../../config/dbConnection');
let conection = dbConnection();

let clientModel = {};

clientModel.getClients = (callback) => {
	if(conection){
		conection.query(
			'SELECT * FROM siscoti_tb_client',
			(err, rows) => {
				if(err){
					throw err;
				}
				else{
					callback(null, rows);
				}
			}
		)
	}
};

clientModel.insertClient = (clientData, callback) => {
	if(conection){
		conection.query(
			'INSERT INTO siscoti_tb_client SET ?',
			clientData,
			(err, result) => {
				if(err){
					throw err;
				}
				else{
					callback(null, {
						'success': true
					})
				}
			}
		)
	}
};
clientModel.updateClient = (clientData, callback) => {
	if(conection){
		const sql = `
			UPDATE siscoti_tb_client SET
			name_client = ${conection.escape(clientData.name_client)},
			mail_client = ${conection.escape(clientData.mail_client)},
			telephone_client = ${conection.escape(clientData.telephone_client)}
			WHERE id_client = ${conection.escape(clientData.id_client)}
		`
		conection.query(sql, (err, result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					"success": true
				});
			}
		})
	}
};
clientModel.deleteClient = (clientData, callback) => {
	const changeStatus = 0;
	if(conection){
		const sql = `
			UPDATE siscoti_tb_client SET
			status_client = ${conection.escape(changeStatus)}
			WHERE id_client = ${conection.escape(clientData.id_client)}
		`
		conection.query(sql, (err, result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					"succes": true
				});
			}
		})
	}
};

module.exports = clientModel;
