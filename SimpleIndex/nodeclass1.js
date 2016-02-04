var http = require('http');
var fs = require('fs');

function writeNumbers(res) {
	var counter = 0;
	for(var i = 0; i<100; i++) {
		counter ++ ;
		res.write(counter.toString()+'\n');
	}
}

http.createServer(function(req, res) {
    var query = require('url').parse(req.url).query;
    var app = require('querystring').parse(query).file + ".txt";


    res.writeHead(200, {'Content-Type': 'text/plain'});

    writeNumbers(res);

    setTimeout(function () {
        console.log('opening ' + app);
        fs.readFile(app, 'utf8', function(err,data) {
            if (err) {
                res.write('Could not find file \n');
            }
            else {
                res.write(data);
            }

            res.end();
        });
    },2000);
}).listen(8124);

console.log('Server running at 8124');

process.stdin.resume();
process.stdin.on('data', function(chunk) {
    process.stdout.write('data: ' + chunk);
});

setInterval(function() {
    console.log('fuck.');
},1000);

