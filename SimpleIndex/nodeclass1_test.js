var http = require('http');

var option = {
	host: 'localhost',
	port: 8124,
	path: '/?file=secondary',
	method: 'GET'
};

var processPublicTimeline = function (response) {
	console.log('finished request');
};

for (var i = 2000; i >= 0; i--) {
	http.request(option, processPublicTimeline).end();
}