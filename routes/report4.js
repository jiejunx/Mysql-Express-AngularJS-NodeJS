var express = require('express');
var router = express.Router();
var PropertiesReader = require('properties-reader');
var mysql_client = require('mysql2'); // changed from mysql -> mysql2
var properties = PropertiesReader('local.properties');
var fs = require('fs');



var mysql_host = properties.get('database.mysql.host');
var mysql_port = properties.get('database.mysql.port');
var mysql_user = properties.get('database.mysql.user');
var mysql_pwd = properties.get('database.mysql.pwd');
var mysql_schema = properties.get('database.mysql.schema');



/* GET report 4 - ALL states page. */
router.get('/', function(req, res, next) {

    var db = mysql_client.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });
    db.connect(function (err) {
        if(err) {
            console.log("db connection error " + err.message);
            throw err;
        }
    });
    var query = fs.readFileSync('allsql/report4.sql', 'utf-8');
    db.query(query, function (err, results, fields) {
        if (err) {
            console.log("db query error!");
            throw error;
        }
        console.log("results are: ");


        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        res.setHeader('Content-Type', 'text/json');


        res.status(200).json(results);
        res.end();
    });
    db.end();
    // res.render('index', { title: 'Express' });
});

/* GET report 4 - ALL states page. */
router.get('/:state', function(req, res, next) {

    var db = mysql_client.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });
    db.connect(function (err) {
        if(err) {
            console.log("db connection error " + err.message);
            throw err;
        }
    });
    var state = req.params['state'];

    var query = fs.readFileSync('allsql/report4-bystate.sql', 'utf-8');
    db.query(query, [state],function (err, results, fields) {
        if (err) {
            console.log("db query error!");
            throw error;
        }
        console.log("results are: ");

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        res.setHeader('Content-Type', 'text/json');


        res.status(200).json(results);
        res.end();
    });
    db.end();
    // res.render('index', { title: 'Express' });
});



module.exports = router;