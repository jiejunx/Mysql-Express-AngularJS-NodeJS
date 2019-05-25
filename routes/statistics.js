var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var fs = require('fs');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('local.properties');

//Mysql database/server credentials: update to final server deployment

var mysql_host = properties.get('database.mysql.host');
var mysql_port = properties.get('database.mysql.port');
var mysql_user = properties.get('database.mysql.user');
var mysql_pwd = properties.get('database.mysql.pwd');
var mysql_schema = properties.get('database.mysql.schema');


router.get('/',requestHandler);

function requestHandler(req, res) {
    var db = mysql.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port:mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });

    db.connect(function(err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end()
        }
        var query = fs.readFileSync('allsql/statistics.sql', 'utf-8');
        console.log("Connected to MySQL...");
        db.query(
            query,
            function( err, result){
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end()
                }
                var stats = [];
                console.log(result.length);
                var results = JSON.parse(JSON.stringify(result));
                stats.push(results[0][0]);
                stats.push(results[1][0]);
                stats.push(results[2][0]);
                stats.push(results[3][0]);

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                res.setHeader('Content-Type', 'text/json');
                res.status(200).json(stats);
                db.end();
                res.end();
            }
        )
    })
}



module.exports = router;