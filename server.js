var express = require('express');
var app = express();
app.use(express.static('./'));
var server = app.listen(2112, function() {
	var host = server.address().adress;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});