var http = require('http');

http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.write("Welcome to My Blog \r\n");

	res.write("Jonassen 2016\r\n");

    res.end();
}).listen(2000);

console.log('Server running at 2000');

