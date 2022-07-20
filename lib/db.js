const mysql = require('mysql');

const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
    port:'3306',
	password:'12345',
	database:'node_db'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully');
	}
});

module.exports = connection;
