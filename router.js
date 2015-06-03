function route(handle, pathname, res, postData) {
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](res, postData);
  } else {
    console.log('No request handler found for ' + pathname);
    
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
}

exports.route = route;