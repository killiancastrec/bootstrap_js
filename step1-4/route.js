const http = require('http');
const url = require('url');


module.exports = http.createServer((req, res) => {
    var controller = require('./controller.js');
    const reqUrl = url.parse(req.url, true);
    // GET endpoint
    if (reqUrl.pathname == '/' && req.method === 'GET') {
        controller.index(req, res);
    }
    else if (reqUrl.pathname == '/form' && req.method === 'GET') {
        controller.form(req, res)
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(404);
        res.write('404 error : Page not found .');
    }
}
)