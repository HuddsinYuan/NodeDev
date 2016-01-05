/**
 * Created by Jonassen on 16/1/5.
 */
var settings = require('../Mongodb');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));
