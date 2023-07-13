const mysql = require("mysql");

const MySQLConnect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'consumoapi',
});

MySQLConnect.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }else {
        console.log("Conectado a la base de datos MySQL en el puerto || 3306");
    }
});

module.exports = MySQLConnect;

