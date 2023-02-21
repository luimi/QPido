var express = require('express');
var ParseServer = require('parse-server').ParseServer;
require('dotenv').config();
var app = express();

var api = new ParseServer({
  databaseURI: process.env.DATABASE,
  cloud: './cloud/main.js', 
  appId: process.env.APPID,
  masterKey: process.env.MASTERKEY,
  serverURL: process.env.SERVERURL,
  liveQuery: {
    classNames: ['_User','delivery','chatMessage']
  },
  websocketTimeout: 10 * 1000,
  cacheTimeout: 60 * 600 * 1000
});

app.use('/parse', api);

var httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);