const mysql = require('mysql');
conection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'testapi'
});

let userModel = {};

userModel.getUsers = (callback) => {
	if(conection){
		conection.query(
			'SELECT * FROM usuarios',
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

userModel.insertUser = (userData, callback) => {
	if(conection){
		conection.query(
			'INSERT INTO usuarios SET ?',
			userData,
			(err, result) => {
				if(err){
					throw err;
				}
				else{
					callback(null, {
						'insertId': result.insertId
					})
				}
			}
		)
	}
};

userModel.updateUser = (userData, callback) => {
	if(conection){
		const sql = `
			UPDATE usuarios SET
			username = ${conection.escape(userData.username)},
			mail = ${conection.escape(userData.mail)},
			pass = ${conection.escape(userData.pass)}
			WHERE id = ${conection.escape(userData.id)}
		`
		conection.query(sql, (err, result) => {
			if(err){
				throw err;
			}else{
				callback(null, {
					"msg": "succes"
				});
			}
		})
	}
};

module.exports = userModel;