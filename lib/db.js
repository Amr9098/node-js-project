const mysql = require('mysql');

const connection = mysql.createConnection({
	host:'localhost',
	user:'amr',
    port:'3309',
	password:'123',
	database:'nodejs_project'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully');
	}
});

module.exports = connection;
