/**
 * Created by Jonassen on 16/2/4.
 */

var net = require('net');

net.createServer(function (conn) {
    console.log('connected.');

    conn.on('data', function(data) {
        console.log(data + ' from ' + conn.remoteAddress + ' ' +
            conn.remotePort);
        conn.write('Repeating: ' + data) ;
    });

    conn.on('close', function() {
        console.log('client closed connection');
    });
}).listen(8124);

console.log('listen on port 8124');