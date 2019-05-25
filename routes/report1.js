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

/** GET top 100 manufacturers from server */

// route --> /r1
router.get('/', function(req, res, next) {
  console.log("entered");
  // reading the query
  var query = fs.readFileSync('allsql/report1.sql', 'utf-8');
  //setup config
  var db = mysql_client.createConnection({
    host: mysql_host,
    port: mysql_port,    
    user: mysql_user,
    password: mysql_pwd,
    database: mysql_schema
  });
  // connect to mysql
  db.connect(function (err) {
    if(err) {
      console.log("db connection error " + err.message);
      throw err;
    }
  });
  // run the query
  db.query(query, function (err, results, fields) {

      if (err) {
          console.log("db query error!");
          throw error;
      }
      console.log("results are: " + JSON.stringify(results));
      //debugging purposes. so that communication b/w sample ip-addr and different hosts is enabled
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

/** GET drill down detail summary for a  manufacturer from server */
// route-> r1/summary/:name
router.get('/summary/:name', function (req, res, next) {
    var output;
    var query1 = fs.readFileSync('allsql/report1-detail1.sql', 'utf-8');
    var query2 = fs.readFileSync('allsql/report1-detail2.sql', 'utf-8');
    console.log("Entered");

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

    // retrieve the manufacturer name from the GET request
    var manufacturer = req.params['name'];
    // replacing underscore's with spaces
    manufacturer = manufacturer.toString().replace(/_/g, ' ');

    db.query(query1,[manufacturer], function (err, results, fields) {
        if (err) {
            console.log("db query error!");
            throw err;
        }
        output = results;

    });
    db.query(query2, [manufacturer], function (err, results, fields) {
        if (err) {
            console.log("db query error!");
            throw err;
        }

        results[0].MaxDiscount = output[0].MaxDiscount;
        console.log("results are: " + JSON.stringify(results));

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        res.setHeader('Content-Type', 'application/json');


        res.status(200).json(results);
        res.end();
    });
    db.end();

});

//route-> r1/plist/:manu
router.get('/plist/:manu', function (req, res, next) {

    console.log("EnteredHasd");
    var query = fs.readFileSync('allsql/report1-detail3.sql', 'utf-8');

    var manufacturer = req.params['manu'];
    manufacturer = manufacturer.toString().replace(/_/g, ' ');
    console.log("fetching plist for manufacturer " +manufacturer);
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


    db.query(query, [manufacturer], function (err, results, fields) {
        if (err) {
            console.log("db query error!");
            throw err;
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        res.setHeader('Content-Type', 'application/json');


        res.status(200).json(results);
        res.end();
    });
    db.end();
});


module.exports = router;
