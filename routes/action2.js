var express = require('express');
var router = express.Router();
var PropertiesReader = require('properties-reader');
var mysql = require('mysql2'); // changed from mysql -> mysql2
var properties = PropertiesReader('local.properties');
var fs = require('fs');


//Mysql database/server credentials: update to final server deployment
var mysql_host = properties.get('database.mysql.host');
var mysql_port = properties.get('database.mysql.port');
var mysql_user = properties.get('database.mysql.user');
var mysql_pwd = properties.get('database.mysql.pwd');
var mysql_schema = properties.get('database.mysql.schema');




router.get('/get-name', getManagerName);
router.get('/get-email', getEmail);
router.get('/', getManagerInfo);
router.get('/get-assign', getAssignRelationship)
router.post('/add', addManager);
router.post('/remove', removeManager);
router.post('/assign', assignManager);
router.post('/unassign', unassignManager);
router.get('/storelist', getStoreInfo);

function getStoreInfo(req, res) {
    var db = mysql.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });


    var query = "select StoreNumber, PhoneNumber, StreetAddress, CityName, State from Store";

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]')
            res.end()
        }

        console.log("Connected to MySQL...");
    })

    db.query(query, function (err, results, fields) {
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

}


function getManagerInfo(req, res) {
    var managerName = req.query.managername;
    var email = req.query.email;

    var db = mysql.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]')
            res.end()
        }
        console.log("Connected to MySQL...");
        var query;
        if (managerName === undefined && email === undefined) {
            query = "SELECT Email, ManagerName FROM ActiveManager; SELECT Email, ManagerName FROM InactiveManager";
        } else if (email === undefined) {
            query = "SELECT Email, ManagerName FROM ActiveManager WHERE ManagerName = '" + managerName + "'; SELECT Email, ManagerName FROM InactiveManager WHERE ManagerName = '" + managerName + "'";
        } else {
            query = "SELECT Email, ManagerName FROM ActiveManager WHERE Email = '" + email + "'; SELECT Email, ManagerName FROM InactiveManager WHERE Email = '" + email + "'";
        }
        db.query(
            query,
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end()
                }
                var results = JSON.parse(JSON.stringify(result));
                // console.log(results);
                var response = [];
                if (results[0].length !== 0) {
                    var x;
                    var active = results[0];
                    for (x = 0; x < results[0].length; x++) {
                        results[0][x].Status = "Active";
                        response.push(results[0][x]);
                    }
                }
                if (results[1].length !== 0) {
                    var x;
                    for (x = 0; x < results[1].length; x++) {
                        results[1][x].Status = "Inactive";
                        response.push(results[1][x]);
                    }
                }
                res.send(response)
                db.end()
                res.end()
            }
        )
    })
}

function getEmail(req, res) {
    var managerName = req.query.managername;
    var option = req.query.option;
    var storeNumber = req.query.storenumber;
    var db = mysql.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });
    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        console.log("Connected to MySQL...");
        var query;
        switch (option) {
            case "all":
                query = managerName === undefined ? "SELECT DISTINCT Email FROM ActiveManager UNION SELECT DISTINCT Email FROM InactiveManager ORDER BY Email"
                    : "SELECT DISTINCT Email FROM ActiveManager WHERE ManagerName = '" + managerName +
                    "' UNION SELECT DISTINCT Email FROM InactiveManager WHERE ManagerName = '" + managerName + "'"
                break;
            case "active":
                query = storeNumber === undefined ? "SELECT DISTINCT Email FROM ActiveManager ORDER BY Email" : "SELECT ActiveManagerEmail FROM Assign WHERE StoreNumber = '" + storeNumber + "'";
                break;
            case "inactive":
                query = managerName === undefined ? "SELECT DISTINCT Email FROM InactiveManager ORDER BY Email" : "SELECT DISTINCT Email FROM InactiveManager WHERE ManagerName = '" + managerName + "'";
                break;
        }

        db.query(query,
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end()
                }

                var results = JSON.parse(JSON.stringify(result));
                console.log(results);
                res.send(results)
                db.end();
                res.end();
            }
        )
    })

}


function getManagerName(req, res) {
    var email = req.query.email;
    var option = req.query.option;
    var db = mysql.createConnection({
        // multipleStatements: option === "all" ,
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    });

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        console.log("Connected to MySQL...");
        var query;

        if (email === undefined) {
            query = option === "all" ? "SELECT DISTINCT ManagerName FROM ActiveManager UNION SELECT DISTINCT ManagerName FROM InactiveManager ORDER BY ManagerName" : "SELECT DISTINCT ManagerName FROM InactiveManager ORDER BY ManagerName";
        } else {
            query = option === "all" ? "SELECT DISTINCT ManagerName FROM ActiveManager WHERE Email = '" + email + "' UNION SELECT DISTINCT ManagerName FROM InactiveManager WHERE Email = '" + email + "'"
                : "SELECT DISTINCT ManagerName FROM InactiveManager WHERE Email = '" + email + "'";
        }
        db.query(
            query,
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end()
                    res.send('[]')
                    res.end()
                }
                console.log(result);
                var results = JSON.parse(JSON.stringify(result));
                res.send(results)
                db.end()
                res.end()
            }
        )
    })
}

function addManager(req, res) {
    var name = req.query.managername;
    var email = req.query.email;
    var db = mysql.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })
    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        db.query(
            "SELECT Email, ManagerName FROM ActiveManager WHERE Email = '" + email + "' UNION SELECT Email, ManagerName FROM InactiveManager WHERE Email = '" + email + "'",
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end();
                }
                if (result.length === 0) {
                    db.query(
                        "INSERT INTO InactiveManager(Email, ManagerName) VALUES('" + email + "', '" + name + "')",
                        function (err, result) {
                            if (err) {
                                console.log("db query error!");
                                console.log(err);
                                db.end();
                                res.send('[]');
                                res.end();
                            }
                            res.send({"message": "Success: The manager has been added!"});
                            db.end();
                            res.end();
                        }
                    )
                } else {
                    res.send({"message": "Show error dialog: The manager already exists!"});
                    db.end();
                    res.end();
                }

            }
        )
    })
}

function removeManager(req, res) {
    var email = req.query.email;

    var db = mysql.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        db.query(
            "DELETE FROM InactiveManager WHERE Email = '" + email + "'",
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end();
                }
                res.send({"message": "Deleted the InactiveManager!"});
                db.end();
                res.end();
            }
        )
    })
}

function getAssignRelationship(req, res) {
    var email = req.query.manageremail;
    var storeNumber = req.query.storenumber;

    var db = mysql.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        var query;
        if (email === undefined && storeNumber === undefined) {
            query = "SELECT DISTINCT ActiveManagerEmail FROM Assign ORDER BY ActiveManagerEmail; SELECT DISTINCT StoreNumber FROM Assign ORDER BY StoreNumber";
        } else if (email !== undefined) {
            query = "SELECT StoreNumber, ActiveManagerEmail FROM Assign WHERE ActiveManagerEmail = '" + email + "'";
        } else {
            query = "SELECT StoreNumber, ActiveManagerEmail FROM Assign WHERE StoreNumber = '" + storeNumber + "'";
        }
        db.query(
            query,
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end();
                }
                if (result.length !== 1) {
                    res.send(JSON.parse(JSON.stringify(result)));
                    db.end();
                    res.end();
                } else {
                    res.send(JSON.parse(JSON.stringify(result)));
                    db.end();
                    res.end();
                }

            }
        )
    })

}

function assignManager(req, res) {
    var email = req.query.manageremail;
    var storeNumber = req.query.storenumber;
    var db = mysql.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        db.query(
            "SELECT StoreNumber, ActiveManagerEmail FROM Assign WHERE ActiveManagerEmail = '" + email + "' AND StoreNumber = '" + storeNumber + "'; SELECT * FROM Store WHERE StoreNumber = '" + storeNumber + "'",
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end();
                }
                if (result[0].length !== 0) {
                    res.send({"message": "The assignment already exists in the system!"});
                    db.end();
                    res.end();
                } else if (result[1].length === 0) {
                    res.send({"message": "Error: the store doesn't exist! Please enter the correct store number."});
                    db.end();
                    res.end();
                } else {
                    db.query(
                        "SELECT Email, ManagerName FROM ActiveManager WHERE Email = '" + email + "'; SELECT * FROM InactiveManager WHERE Email = '" + email + "'",
                        function (err, result) {
                            if (err) {
                                console.log("quit")
                                console.log("db query error!");
                                console.log(err);
                                db.end();
                                res.send('[]');
                                res.end();
                            }
                            if (result[1].length !== 0) {
                                var query = "INSERT INTO ActiveManager(Email, ManagerName) SELECT Email, ManagerName FROM InactiveManager WHERE Email = '"
                                    + email + "'; DELETE FROM InactiveManager WHERE Email = '" + email + "'; INSERT INTO Assign(StoreNumber, " +
                                    "ActiveManagerEmail) VALUES('" + storeNumber + "', '" + email + "')";
                                console.log(query)
                                db.query(
                                    query,
                                    function (err, result) {
                                        if (err) {
                                            console.log("catch you")
                                            console.log("db query error!");
                                            console.log(err);
                                            db.end();
                                            res.send('[]');
                                            res.end();
                                        }
                                        res.send({"message": "Success: The assignment is completed!"});
                                        db.end();
                                        res.end();
                                    }
                                )

                            } else {
                                db.query(
                                    "INSERT INTO Assign(StoreNumber, ActiveManagerEmail) VALUES('" + storeNumber + "', '" + email + "')",
                                    function (err, result) {
                                        if (err) {
                                            console.log("db query error!");
                                            console.log(err);
                                            db.end();
                                            res.send('[]');
                                            res.end();
                                        }
                                        res.send({"message": "Success: The assignment is completed!"});
                                        db.end();
                                        res.end();
                                    }
                                )
                            }


                        }
                    )

                }

            }
        )
    })
}


function unassignManager(req, res) {
    var email = req.query.manageremail;
    var storeNumber = req.query.storenumber;
    var db = mysql.createConnection({
        multipleStatements: true,
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_pwd,
        database: mysql_schema
    })

    db.connect(function (err) {
        if (err) {
            console.log("db connection error!");
            res.send('[]');
            res.end();
        }
        db.query(
            "DELETE FROM Assign WHERE StoreNumber = '" + storeNumber + "' AND ActiveManagerEmail = '" + email + "'",
            function (err, result) {
                if (err) {
                    console.log("db query error!");
                    console.log(err);
                    db.end();
                    res.send('[]');
                    res.end();
                }
                db.query(
                    "SELECT StoreNumber, ActiveManagerEmail FROM Assign WHERE ActiveManagerEmail = '" + email + "'",
                    function (err, result) {
                        if (err) {
                            console.log("db query error!");
                            console.log(err);
                            db.end();
                            res.send('[]');
                            res.end();
                        }
                        if (result.length === 0) {
                            var query = "INSERT INTO InactiveManager(Email, ManagerName) SELECT Email, ManagerName FROM ActiveManager WHERE Email = '" + email + "'; DELETE FROM ActiveManager WHERE Email = '"+email+"'";
                            db.query(
                                query,
                                function (err, result) {
                                    if (err) {
                                        console.log("catch you")
                                        console.log("db query error!");
                                        console.log(err);
                                        db.end();
                                        res.send('[]');
                                        res.end();
                                    }
                                    res.send({"message": "Success: the manager has been unassigned from the store!"});
                                    db.end();
                                    res.end();
                                }
                            )

                        } else {
                            res.send({"message": "Success: the manager has been unassigned from the store!"});
                            db.end();
                            res.end();
                        }


                    }
                )


            }
        )
    })
}

module.exports = router;
