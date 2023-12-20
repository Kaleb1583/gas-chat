const http = require('http');

window.requestListener = function requestListener(req, res) {
  let forwarded = req.headers['x-forwarded-for']
  let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  res.writeHead(200);
  res.end(ip);
}

console.log("-")