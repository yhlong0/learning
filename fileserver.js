var http = require('http');
var formidable = require('formidable');

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
}).listen(3000);

function show(req, res) {
    var html = ''
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="fileName" /></p>'
        + '<p><input type="file" name="selectFile" /></p>'
        + '<p><input type="submit" value="Upload" /></p>'
        + '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }

    var form = new formidable.IncomingForm();

    form.on('field', function (field, value) {
        console.log('This is field ' + field);
        console.log('This is value ' + value);
    });
    form.on('file', function (name, file) {
        console.log('This is name ' + name);
        console.log('This is file ' + file);
    });
    form.on('progress', function (bytesReceived, bytesExpected) {
       var percent = Math.floor(bytesReceived / bytesExpected * 100) ;
       console.log(percent);
    });
    form.on('end', function () {
        res.end('upload complete!');
    });

    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}