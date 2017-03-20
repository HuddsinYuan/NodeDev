/**
 * Created by Jonassen on 16/2/4.
 */

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    
    res.write("NGINX: NEXT PAGES");
    res.end();
}).listen(4000);
