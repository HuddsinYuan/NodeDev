/**
 * Created by Jonassen on 16/2/4.
 */

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var query = require('url').parse(req.url).query;
    console.log(query);

    var file = require('querystring').parse(query).file;

    res.writeHead(200, {'Content-Type' : 'text/plain'});
    for(var i = 0; i<50; i++) {
        res.write(i + '\n');
    }

    var data = fs.readFileSync(file, 'utf8');

    res.write(data);
    res.end();
}).listen('whatsocket');