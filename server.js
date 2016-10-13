var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var mobile = require('./routes/mobile');
//var mapinfo = require('./routes/mapinfo');
var snapmap = require('./routes/snapmap');
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname+'/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/', routes);
app.use('/mobile/old',mobile);
//app.use('/mapinfo',mapinfo);
app.use('/snapmap',snapmap);

app.get('/mobile', function(request, response){ 
  return response.sendFile(__dirname+'/static/mobile.html');
});
app.get('/desktop', function(request, response){ 
  return response.sendFile(__dirname+'/static/desktop.html');
});

app.listen(3000);