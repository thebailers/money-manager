var app = require('./server/server')

app.listen(7770, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('We are a go! Pop yourself over to http://localhost:7770')
})
