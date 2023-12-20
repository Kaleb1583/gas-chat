const http = require('http');

function requestListener(req, res) {
  let forwarded = req.headers['x-forwarded-for']
  let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  res.writeHead(200);
  res.end(ip);
}

const server = http.createServer(requestListener);
server.listen(3000);

console.log('Server listening at http://localhost:3000');