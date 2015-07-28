//Defining express framework and other libraries variables
var express = require("express"),
    cors = require('cors'),
    app     = express(),
    port = 2222,
    morgan     = require('morgan');

// Attaching socket.io
var whitelist = ['http://imasdk.googleapis.com'];
var corsOptions = {
 origin: function(origin, callback){
   var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
   callback(null, originIsWhitelisted);
 }
};

app.get('/', cors(corsOptions), function(req, res, next){
  res.send('index.html');
});
 
app.listen(port, function(){
  console.log('Listening on port '+port);
});