var express = require('express');
var router = express.Router();
var PropertiesReader = require('properties-reader');
var mysql_client = require('mysql2'); // changed from mysql -> mysql2
var properties = PropertiesReader('local.properties');
var fs = require('fs');



//Mysql database/server credentials: update to final server deployment
var mysql_host = properties.get('database.mysql.host');
var mysql_port = properties.get('database.mysql.port');
var mysql_user = properties.get('database.mysql.user');
var mysql_pwd = properties.get('database.mysql.pwd');
var mysql_schema = properties.get('database.mysql.schema');


router.get('/',viewHoliday);
router.post('/',addHoliday);

function viewHoliday(req, res) {
    var db = mysql_client.createConnection({
        host: mysql_host,
        port: mysql_port,
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
        db.query(
            "SELECT Date, HolidayName FROM Holiday",
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
                var trimmedResults= [];
                var i;
                for(i=0;i<results.length;i++){
                    var element = results[i];
                    var originalDate = element.Date;
                    element.Date = originalDate.substring(0,10);
                    // console.log(element.Date);
                    trimmedResults.push(element);
                }
                res.send(trimmedResults);
                db.end()
                res.end()
            }
        )
    })
}
function addHoliday(req, res) {

    var date = req.query.holidaydate;
    var holidayName = req.query.holidayname;

    var db = mysql_client.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port: mysql_port,
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

        db.query(
            "SELECT Date, HolidayName FROM Holiday WHERE Date = '"+ date+"'",
            function( err, result){
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end()
                    res.send('[]')
                    res.end()
                }
                if(result.length==0){
                    db.query("SELECT Date FROM Day WHERE Date = '"+ date+"'",
                        function( err, result){
                            if (err) {
                                console.log("db query error!");
                                console.log(err);
                                db.end()
                                res.send('[]')
                                res.end()
                            }
                            holidayName = formatApos(holidayName);
                            query = result.length == 0?"INSERT INTO Day VALUES('"+date+"'); INSERT INTO Holiday(Date, HolidayName) VALUES('"+date+"', '"+holidayName+"')"
                                :"INSERT INTO Holiday(Date, HolidayName) VALUES('"+date+"', '"+holidayName+"')";

                            db.query(query,
                                function( err, result){
                                    if (err) {
                                        console.log("db query error!");
                                        console.log(err);
                                        db.end()
                                        res.send('[]')
                                        res.end()
                                    }
                                    else {
                                        res.send({"message":"Successfully inserted a new holiday record!"});
                                        db.end()
                                        res.end()
                                    }

                                })


                        }
                    )

                }else{
                    var results = JSON.parse(JSON.stringify(result));
                    var originalname = results[0].HolidayName;
                    if(!formatString(originalname).includes(formatString(holidayName))){
                        var concat_holidayname = holidayName+" | "+originalname;

                        concat_holidayname = formatApos(concat_holidayname)
                        console.log("concat name is: "+concat_holidayname)
                        db.query("UPDATE Holiday SET HolidayName = '"+concat_holidayname+"' WHERE Date = '"+date+"'",
                            function( err, result){
                                if (err) {
                                    console.log("db query error!");
                                    console.log(err);
                                    db.end()
                                    res.send('[]')
                                    res.end()
                                }
                                res.send({"message":"Successfully updated the holiday record!"});
                                db.end()
                                res.end()
                            }
                        )
                    }else{
                        res.send({"message":"Great! Nothing to add or change."});
                        db.end()
                        res.end()
                    }


                }

            }
        )

    })
}
function formatString(str){
    // remove spaces and apostrophes and also switch to lower cases
    return str.toLowerCase().replace(/\s/g, '').replace(/'s/g,'');
}
function formatApos(str){
    return str.replace(/'/g,"''");
}
module.exports = router;






