var express = require('express');
const app = express();


var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: 'userdata'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!!");

    var email = "hyu@gmail.com";
    var password = "yes1";

    var insertCmd = "INSERT INTO login_info (email,password) values (?,?)";
    var values = [email,password];

    connection.query(insertCmd,values,function(err,result){
        if (err) throw err;
        console.log("1 Entry Recorded");
    });
});

var server =  app.listen(3000,()=>{
    console.log("Server Running at http://localhost:3000");
});