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


router.get('/',getCityInfo);
router.get('/get-city',getCityName);   //e.g.  localhost:3001/population/get-city
router.get('/get-state',getState);
router.post('/',updatePopulation);



function getCityName(req, res) {
    var state = req.query.state;

    var db = mysql_client.createConnection({
        host: mysql_host,
        port:mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });

    db.connect(function(err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]')
            res.end()
        }
        console.log("Connected to MySQL...");
        var query;
        if(state === undefined){
            query = "SELECT DISTINCT CityName FROM City";
        }else{
            query = "SELECT DISTINCT CityName FROM City WHERE State = '"+state+"'";
        }
        db.query(
            query,
            function( err, result){
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end()
                    res.send('[]')
                    res.end()
                }
                console.log(result.length);
                var results = JSON.parse(JSON.stringify(result));
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(results);
                res.end();
                db.end()

            }
        )
    })
}

function getState(req, res) {
    var cityName = req.query.cityname;
    console.log(cityName)


    var db = mysql_client.createConnection({
        host: mysql_host,
        port:mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function(err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]')
            res.end()
        }
        console.log("Connected to MySQL...");
        var query;
        if(cityName === undefined){
            query = "SELECT DISTINCT State FROM City";
        }else{
            query = "SELECT DISTINCT State FROM City WHERE CityName = '"+cityName+"'";
        }
        db.query(
            query,
            function( err, result){
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end()
                    res.send('[]')
                    res.end()
                }
                console.log(result.length);
                var results = JSON.parse(JSON.stringify(result));
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                res.setHeader('Content-Type', 'application/json');


                res.status(200).json(results);
                db.end();
                res.end()
            }
        )
    })
}





function getCityInfo(req, res) {
    console.log("here!!")
    var cityName = req.query.cityname;
    var state = req.query.state;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    res.setHeader('Content-Type', 'application/json');

    var db = mysql_client.createConnection({
        host: mysql_host,
        port:mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });

    db.connect(function(err) {
        if (err) {
            console.log("db connection error!");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
            res.setHeader('Content-Type', 'application/json');

            res.status(200).json('[]');
            res.end()
        }
        console.log("Connected to MySQL...");
        db.query(
            "SELECT CityName, State, Population FROM City WHERE CityName = '" + cityName + "' AND State = '"+state+"'",
            function( err, result){
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end()
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                    res.setHeader('Content-Type', 'application/json');

                    res.status(200).json('[]');
                    res.end()
                }
                console.log(result.length);
                var results = JSON.parse(JSON.stringify(result));
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                res.setHeader('Content-Type', 'application/json');


                res.status(200).json(results);

                db.end();
                res.end()
            }
        )
    })
}
function updatePopulation(req, res) {
    var cityName = req.query.cityname;
    var state = req.query.state;
    var population = req.query.population
    console.log(cityName+state+population);
    var db = mysql_client.createConnection({
        host: mysql_host,
        port:mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function(err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]')
            res.end()
        }
        console.log("Connected to MySQL...");
        var query = "Update City SET Population = '"+population+"' WHERE CityName = '"+cityName+"' AND State = '"+state+"'";
        console.log(query);
        db.query(
            query,
            function( err, result){
                if (err) {
                    console.log("db query error!");
                    console.log(err);

                    db.end()
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                    res.setHeader('Content-Type', 'application/json');
                    res.send('[]')
                    res.end()
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
                res.setHeader('Content-Type', 'application/json');
                res.send({"message":"Successfully updated the city population"});
                db.end()
                res.end()

            }
        )
    })
}


module.exports = router;