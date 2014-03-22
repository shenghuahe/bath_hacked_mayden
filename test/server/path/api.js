'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/paths', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/paths')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        console.log(res.body);
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});