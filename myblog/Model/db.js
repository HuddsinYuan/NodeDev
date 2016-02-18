/**
 * Created by Jonassen on 16/2/17.
 */

var settings = require('../DBSetting');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, 27017, {}), {safe: true});