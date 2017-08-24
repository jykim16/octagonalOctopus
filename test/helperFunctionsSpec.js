const assert = require('assert');
const expect = require('chai').expect;

const helperFunctions = require('../server/helper-functions.js');

describe('missionResults', function() {
  // it('should return false if a mission fails', function(done){
  //   let playerCount = 5,
  //       missionNum = 2,
  //       failVotes = 2;

  //   let missionOutcome = helperFunctions.missionResult(playerCount, missionNum, failVotes);
  //   assert.equal(missionOutcome, false);
  //   done();
  // })

  it('should return true if a mission passes', function(done){
    let playerCount = 5,
        roundNum = 2,
        failVotes = 0;

    let missionOutcome = helperFunctions.missionResult(playerCount, roundNum, failVotes);
    assert.equal(missionOutcome, true);
    done();
  })
})

describe('generateRoles', function() {
  it('should generate roles for each user', function(done){
    let users = ['Abhi', 'Brian', 'Yang', 'Patrick', '5thPerson'];

    let generatedRoles = helperFunctions.generateRoles(users);

    assert.equal(users.length, Object.keys(generatedRoles).length);
    done();
  })
})

// describe('merlinGuessResult', function() {
//   it('should return true if merlin guess is correct', function(done){
//     db.createGame('54321', 'hostName', 'bbbbb', () => {
//       db.addRoles('54321', {'user': 'Merlin'}, () =>{
//         let merlinGuess = function(result){assert.equal(result, true)};
//         console.log('MERLIN GUESS', merlinGuessResult('54321','user', merlinGuess));
//         helperFunctions.merlinGuessResult('54321','user', merlinGuess);
//         done();
//       })
//     })
//   })
//   it('should return false if merlin guess is not correct', function(done){
//     // db.createGame('54321', 'hostName', 'bbbbb', () => {
//     //   db.addRoles('54321', {'user': 'Merlin'}, () =>{
//     //     let merlinGuess = function(result){assert.equal(result, false)};
//     //
//     //     helperFunctions.merlinGuessResult('54321','notuser', merlinGuess);
//     //     done();
//     //   })
//     // })
//   })
// })

describe('gameIsFinished', function() {
  it('should return true if spies lost', function(done){
    let missions = [true, true, true, false, false];
    let results = helperFunctions.gameIsFinished(missions);
    assert.equal(results, true);
    done();
  })
  it('should return false if spies won', function(done){
    let missions = [true, true, false, false, false];
    let results = helperFunctions.gameIsFinished(missions);
    assert.equal(results, false);
    done();
  })
})

describe('extraInfoAssignment', function() {
  it('should return an object with extra info for special characters', function(done){

    done();
  })
})

describe('generateToken', function() {
  it('should return a generated token with length of 6', function(done){
    let token = helperFunctions.generateToken();

    assert.equal(token.length, 6);
    done();
  })
  it('should return a randomly generated token', function(done){
    let token1 = helperFunctions.generateToken(),
        token2 = helperFunctions.generateToken(),
        compareTokens = token1 !== token2;

    assert.equal(compareTokens, true);
    done();
  })
})
// test('should return false if a mission fails', () => {
//   let playerCount = 5,
//           roundNum = 2,
//           failVotes = 2;
//   expect(helperFunctions.missionResult(playerCount, roundNum, failVotes)).toBe(false);
// });
