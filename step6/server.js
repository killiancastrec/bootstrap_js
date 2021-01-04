const express = require('express')
const app = express()
const port = 3000
const url = require('url');
var cookieParser = require('cookie-parser');

app.use(cookieParser());


app.get(['/', '/index'], (req, res) => {
  res.send('Greetings Traveler!')
})

app.use('/image', express.static('src/image.html'))
app.use('/form', express.static('src/form.html'))

app.get('/student/:id', function (req, res) {
  res.cookie('name', url.parse(req.url, true).query.name,{ maxAge: 900000, httpOnly: true })
  res.cookie('id', req.params.id,{ maxAge: 900000, httpOnly: true })
  res.render('student.ejs', {
    name: url.parse(req.url, true).query.name,
    id: req.params.id
  })
})

app.get('/memory', function (req, res) {
  if (req.cookies["id"]) {
    if (req.cookies['name'] === 'undefined') {
      res.write('student number '+ req.cookies['id']+' was here.')
    } else {
      res.write(req.cookies['name']+', student number '+ req.cookies['id']+' was here.')
    }
  }
  res.end();
})


app.get('*', function(req, res){
  res.status(404).send('what??? 404 :/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})