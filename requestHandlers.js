var querystring = require('querystring'),
    fs          = require('fs'),
    formidable  = require('formidable');

function start(req, res) {
  var body;

  console.log('Request handler start called');

  body = 
  '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset="UTF-8" />' +
  '</head>' +
  '<body>' +
  '<form action="/upload" enctype="multipart/form_data" method="post">' + 
  '<input type="file" name="upload" multiple="multiple">' +
  '<input type="submit" value="Upload file" />' +
  '</form>' +
  '</body>' +
  '</html>';

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end()
}

function upload(req, res) {
  var form = new formidable.IncomingForm();
  console.log('[+] Starting request parsing...');

  form.parse(req, function(error, fields, files) {
    console.log('[+] Parsing complete');

    fs.rename(files.upload.path, '/tmp/test.png', function(err) {
      if (err) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('received image:<br/>');
    res.write('<img src="/show" />');
    res.end();
  });
}

function show(req, res) {
  fs.readFile('./tmp/test.png', 'binary', function(error, file) {
    if(error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write(error + "\n");
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.write(file, 'binary');
      res.end();
    }
  });
}

exports.start  = start;
exports.upload = upload;
exports.show   = show;