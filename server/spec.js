var app = require('./server')
var request = require('supertest')
var expect = require('chai').expect

describe('[Transactions]', function() {

  it('should get all of the transactions', function(done) {
    request(app)
      .get('/api/transactions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array')
        done()
      })
  })

  it('should create a transaction', function(done) {
    request(app)
      .post('/api/transactions')
      .send({
        name: 'Cup of coffee',
        amount: 2.50,
        date: '2016-11-17T17:08:45.767Z'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object')
        done()
      })
  })

  /*
  it('should delete a transaction', function(done) {
    request(app)
      .post('/api/transactions')
      .send({
        name: 'A sandwich',
        amount: 3.50,
        date: '2016-11-17T17:08:45.767Z'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var transaction = resp.body
        request(app)
          .delete('/api/transactions/' + transaction._id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(transaction);
            done();
          })
      })
  })
  */

})
