//add saple test here
var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:4001/echo' , function(error, response, body) {
        expect(body).to.equal('Hello world');
        done();
    });
});