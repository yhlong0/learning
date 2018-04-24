var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function (item, i) {
                res.write(i + ') ' + item + '\n');
            });
            res.end();
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            //10 - base 10
            var i = parseInt(path.slice(1), 10);
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item id cannot found');
            } else {
                //remove item at index i
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
        case 'PUT':
            var path = url.parse(req.url).pathname;
            var newContent = url.parse(req.url).query;
            var i = parseInt(path.slice(1), 10);
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item id cannot found');
            } else {
                //remove item at index i
                items.splice(i, 1, newContent);
                res.end('OK\n');
            }
    }
}).listen(3000);