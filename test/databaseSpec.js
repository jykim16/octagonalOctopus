var assert = require('assert');
var expect = require('chai').expect;
var mongoose = require('mongoose');

describe('CreateGame', function() {
  it('should create a game with given token', function(done){
    database.createGame('12345', 'hostName', 'aaaaa', function(){
      database.selectGame('12345', (game) => {
        assert.equal(game.token, '12345');
        done();
      });
    });
  });
  it('should create a game with empty results array', function(done) {
    database.selectGame('12345', (game) => {
      assert.equal(game.results, '[]');
      done();
    });
  });
  it('should create a game with hostname in playerIds object', function(done) {
    database.selectGame('12345', (game) => {
      assert.equal(game.playerIds, '{"hostName":"aaaaa"}');
      done();
    });
  });
});

describe('addPlayer', function() {
  it('should add a player into game document', function(done) {
    database.addPlayer('12345', 'player1', 'bbbbb', () => {
      database.selectGame('12345', (game) => {
        assert.equal(JSON.parse(game.playerIds).player1, 'bbbbb');
        done();
      });
    });
  });
});

describe('removePlayer', function() {
  it('should remove a player into game document', function(done) {
    database.removePlayer('12345', 'player1', () => {
      database.selectGame('12345', (game) => {
        assert.equal(JSON.parse(game.playerIds).player1,  undefined);
        done();
      });
    });
  });
});

describe('addRoles', function() {
  it('should add roles to the game document', function(done) {
    database.addRoles('12345', {'hostName': 'Merlin'}, () =>{
      database.selectGame('12345', (game) => {
        assert.equal(JSON.parse(game.playerRoles).hostName, 'Merlin');
        done();
      });
    });
  });
});

describe('updateResults', function() {
  it('should update results of game document', function(done) {
    database.updateResults('12345', [true, true, false], () => {
      database.selectGame('12345', (game) => {
        assert.equal(game.results, '[[true,true,false]]');
        done();
      });
    });
  });
});

describe('getMerlin', function() {
  it('should return the username of Merlin', function(done) {
    database.getMerlin('12345', (Merlin) => {
      assert.equal(Merlin, 'hostName');
      done();
    });
  });
});

describe('getPlayerRoleMapping', function() {
  it('should return object with key as username and role as value', function(done) {
    database.getPlayerRoleMapping('12345', (playerRoles) => {
      assert.equal(JSON.stringify(playerRoles), '{"hostName":"Merlin"}');
      done();
    });
  });
});


describe('getPlayerIdMapping', function() {
  it('should return object with key as username and id as value', function(done) {
    database.getPlayerIdMapping('12345', (playerIds) => {
      assert.equal(JSON.stringify(playerIds), '{"hostName":"aaaaa"}');
      done();
    });
  });
});
