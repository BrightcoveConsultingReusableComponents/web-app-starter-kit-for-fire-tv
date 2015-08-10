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
      var key = generateKey();

      ip = ip.replace(/f|:/gi, '');
      ip = ip.replace(/\./g, '-');

      console.log(ip);
      
      /*var currentData = ""; 
      //database.child(1).set({'name':'user2','age':'34'});*/
      var database = new Firebase('https://intense-heat-5166.firebaseio.com/webfireTV/');
      
      /*
      database.once("value", function(snapshot) {
        currentData = snapshot.val();
      });

      console.log(currentData);
      */
      
      data = {}
      data[ip] = key;
      database.set(data);
	  res.send(key);
	});

    app.post('/login', function(req, res) {

    });


    function generateKey() {
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
