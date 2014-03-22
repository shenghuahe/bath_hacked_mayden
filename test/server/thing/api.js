'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/awesomeThings', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/awesomeThings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/paths', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/paths')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(2);
        done();
      });
  });
});

describe('GET /api/paths/10/10/150/150 should return 1 entry', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/paths/10/10/150/150')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(1);
        done();
      });
  });
});

describe('GET /api/paths/10/10/1500/1500 should return 2 entries', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/paths/10/10/1500/1500')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(2);
        done();
      });
  });
});