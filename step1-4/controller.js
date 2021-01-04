const url = require('url');
let fs = require('fs');

exports.index = function (req, res) {
    console.log("Client Connected")
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./index.html', "utf-8", function (error, data) {
          if (error) {
              res.writeHead(404);
              res.write('Whoops! File not found!');
          } else {
            if (!url.parse(req.url, true).query.name) {
              res.write(data.replace("$NAME", "whoever you are"));
            } else {
              res.write(data.replace("$NAME", url.parse(req.url, true).query.name));
            }
            if (url.parse(req.url, true).query.message && url.parse(req.url, true).query.message=="ping") {
              res.write("pong")
            } else {
              res.write("Sorry, I don't understand. :(");
            }
          }
          res.end();
    });
    console.log("Client Disconnected")
}
 
exports.form = function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./form.html', "utf-8", function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Whoops! File not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
}