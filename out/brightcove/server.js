//Defining express framework and other libraries variables
var express = require("express"),
    app     = express(),
    qs = require('querystring'),
    bs = require( "body-parser")
    Firebase = require("firebase");

//CORS middleware - Allow Cross Origin requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // NOT SAFE FOR PRODUCTION
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
}

//use the allowCrossDomain function and bodyparsing
app.use(allowCrossDomain);
app.use(express.static(__dirname));

//use body parser
app.use(bs.json());
app.use(bs.urlencoded({
  extended: true
}));


//handle post requests
app.get('/login', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    ip = ip.replace(/f|:/gi, '');
    ip = ip.replace(/\./g, '-');
    var token = generateToken();

    var database = new Firebase('https://intense-heat-5166.firebaseio.com/webfireTV/');
    var data = {}
    database.once("value", function(snapshot) {
        data = snapshot.val();

        if(ip in data){
            if(data[ip].email && data[ip].password){
                res.send('#'+data[ip].username);
            } else{
                res.send(data[ip].token || data[ip]);
            }
        } else{
            data[ip] = token;
            data[token] = ip;
            database.set(data);  
            res.send(token); 
        }

        });

});

app.get('/login/check', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    ip = ip.replace(/f|:/gi, '');
    ip = ip.replace(/\./g, '-');
    
    //Another account should be setup for this. All the data is on the database.json on this repo
    var database = new Firebase('https://intense-heat-5166.firebaseio.com/webfireTV/');
    var data = {}
    database.once("value", function(snapshot) {
        data = snapshot.val();

        if(ip in data){
            if(data[ip].email && data[ip].password){
                res.send('#'+data[ip].username);
            } else{
                res.send(null);
            }
        } else{
            res.send(null);
        }

    });

});

app.get('/login/logout', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    ip = ip.replace(/f|:/gi, '');
    ip = ip.replace(/\./g, '-');
    var token = generateToken();

    var database = new Firebase('https://intense-heat-5166.firebaseio.com/webfireTV/');
    var data = {};

    database.once("value", function(snapshot) {
        data = snapshot.val();
        if(ip in data){
            delete data[ip];
            database.set(data);
            res.send('#'+token);
        } else{  
            res.send('#'+token); 
        }

    });

});


function generateToken() {
    var key = ""
    var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 9; i++) {
        key += variables.charAt(Math.floor(Math.random() * variables.length));
    };

    return key;

};

console.log('Request received');
console.log('Server running at port 2222');

app.listen(2222);
