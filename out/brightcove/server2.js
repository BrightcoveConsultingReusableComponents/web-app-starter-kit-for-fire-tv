//Defining express framework and other libraries variables
var express = require("express"),
    cors = require('cors'),
    app     = express();

//CORS middleware - Allow Cross Origin requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://imasdk.googleapis.com'); // NOT SAFE FOR PRODUCTION
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
}

//use the allowCrossDomain function and bodyparsing
    app.use(allowCrossDomain);
    app.use(express.static(__dirname));

    console.log('Request received');
    console.log('Server running at port 2222');

app.listen(2222);
