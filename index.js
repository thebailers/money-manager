var app = require('./server/server')

app.listen(7770, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('We are running. Pop yourself over to http://localhost:7770')
})
