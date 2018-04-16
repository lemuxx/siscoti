const dbConnection = require('../../config/dbConnection');
let connection = dbConnection();
let clientModel = {};

clientModel.getClients = (callback) => {
	const status_client = 1;
	if(connection){
		connection.query(
			'SELECT * FROM siscoti_tb_client WHERE status_client = ?', [status_client],
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
	if(connection){
		connection.query(
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
	if(connection){
		const sql = `
			UPDATE siscoti_tb_client SET
			name_client = ?,
			mail_client = ?,
			telephone_client = ?
			WHERE id_client = ?
		`
		console.log(clientData.id_client);
		connection.query(sql, [clientData.name_client,
													clientData.mail_client,
													clientData.telephone_client,
													clientData.id_client],
		(err, result) => {
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
	if(connection){
		const sql = `
			UPDATE siscoti_tb_client SET
			status_client = ?
			WHERE id_client = ?
		`
		connection.query(sql, [changeStatus,
													clientData.id_client],
		(err, result) => {
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
