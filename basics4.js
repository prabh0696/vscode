var express = require('express');
const app = express();
var mysql = require('mysql');

var bodyparser = require('body-parser');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: 'giftbucket'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/register/',(req,res,next)=>{
    
    var data = req.body;
    var password = data.password;
    var email = data.email;

    connection.query("SELECT * FROM login_info WHERE email = ?",[email],function(err,result,fields){
        connection.on('error',(err)=>{
            console.log("[MySQL ERROR]",err);
        });

        if(result && result.length){
            res.json("User already exists");
        }
        else{
            var insert_cmd = "INSERT INTO login_info (email,password) values (?,?)";
            values = [email,password];

            console.log("executing: "+insert_cmd);
            connection.query(insert_cmd,values,(err,result,fields)=>{
               connection.on('err',(err)=>{
                console.log("[MySQL ERROR]",err);
               });
               res.json("Registered!");
               console.log("Registration Successful");
            });
        }
    });

    
});

app.post("/login/",(req,res,next)=>{
    var data = req.body;
    var password = data.password;
    var email = data.email;

    connection.query("SELECT * FROM login_info WHERE email = ?",[email],(err,result,fields)=>{
        connection.on('error',(err)=>{
            console.log("[MySQL ERROR]",err);
        });

        if(result && result.length){
            console.log(result);

            if(password==result[0].password){
                res.json("User logged in");
                res.end;
            }else{
                res.json("Wrong Password");
                res.end;
            }
        }else{
            res.json("User not found");
            res.end;
        }
    });
});

app.post('/profile/',(req,res,next)=>{
    
    var data = req.body;
    var name = data.name;
    var email = data.email;
    var phone = data.phone;
    var address = data.address;
    var city = data.city;
    var province = data.province;
    var country = data.country;
    var postalcode = data.postalcode;

    connection.query("SELECT * FROM user_profile WHERE email = ?",[email],function(err,result,fields){
        connection.on('error',(err)=>{
            console.log("[MySQL ERROR]",err);
        });

        if(result && result.length){
            res.json("Profile data for this User already exists.....");
        }
        else{
            var insert_cmd = "INSERT INTO user_profile (name,email,phone,address,city,province,country,postalcode) values (?,?,?,?,?,?,?,?)";
            values = [name,email,phone,address,city,province,country,postalcode];

            console.log("executing: "+insert_cmd);
            connection.query(insert_cmd,values,(err,result,fields)=>{
               connection.on('err',(err)=>{
                console.log("[MySQL ERROR]",err);
               });
               res.json(name+"'s profile data has been saved");
               console.log("Profile data saved successfully");
            });
        }
    });

    
});

var server =  app.listen(3000,()=>{
    console.log("Server Running at http://localhost:3000");
});