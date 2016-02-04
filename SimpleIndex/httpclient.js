/**
 * Created by Jonassen on 16/2/4.
 */

var http = require('http');

var options =  {
    method:'GET',
    socketPath:'whatsocket',
    path:'/?file=main.txt'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('chunk data: ' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem: ' + e.message);
});

req.write('data\n');
//req.write( 'data\n');
req.end();
