const _ = require('underscore');
// const db = require('../database-mongo');

// key represents number of players.
// values represent the different roles that will be played
const roles = {
  5: ['Mordred', 'Merlin', 'Loyal Servant_1', 'Loyal Servant_2', 'Minion of Mordred'],
  6: ['Mordred', 'Merlin', 'Loyal Servant_1', 'Loyal Servant_2', 'Minion of Mordred', 'Loyal Servant_3'],
  7: ['Mordred', 'Merlin', 'Loyal Servant_1', 'Loyal Servant_2', 'Minion of Mordred', 'Percival', 'Morgana'],
  8: ['Mordred', 'Merlin', 'Loyal Servant_1', 'Loyal Servant_2', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant_3'],
  9: ['Mordred', 'Merlin', 'Loyal Servant_1', 'Loyal Servant_2', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant_3', 'Oberon'],
  10: ['Mordred', 'Merlin', 'Loyal Servant_1', 'Loyal Servant_2', 'Minion of Mordred', 'Percival', 'Morgana', 'Loyal Servant_3', 'Oberon', 'Loyal Servant_4'],
}

// key represents number of players.
// values represent number of players that
// will go on a mission. The index
// represents what mission it is.
const numPeopleOnMission = {
  5: [2,3,2,3,3],
  6: [2,3,4,3,4],
  7: [2,3,3,4,4],
  8: [3,4,4,5,5],
  9: [3,4,4,5,5],
  10: [3,4,4,5,5]
}

// key represents number of players.
// values represent how many votes it will
// take to fail a mission. The index
// represents what mission it is.
const numFailuresNeeded = {
  5: [1,1,1,1,1],
  6: [1,1,1,1,1],
  7: [1,1,1,2,1],
  8: [1,1,1,2,1],
  9: [1,1,1,2,1],
  10: [1,1,1,2,1]
}

module.exports.missionResult = (playerCount, roundNum, votesArray) => {
  var numFailures = 0;
  for (var i = 0; i < votesArray.length; i++) {
    if (!votesArray[i]) {
      numFailures++
    }
  }
  // depending on number of players and round, returns
  // if mission passed (true) or not (false)

  // if numFailures is equal or greater to what is needed to fail for
  // the given amount of players return true, otherwise false.
  return !(numFailures >= numFailuresNeeded[playerCount][roundNum]);
};

module.exports.generateRoles = (usernames) => {
  // given array of usernames generate object mapping username
  // to roles

  // output array of users roles
  let userRoles = {},
      shuffleRoles;
  // get the length of the usernames.
  const key = usernames.length;
  // shuffle the roles
  shuffleRoles = _.shuffle(roles[key]);
  // iterate through usernames
  for (let i = 0; i < usernames.length; i++) {
    //add username as key and role as value
    userRoles[usernames[i]] = shuffleRoles[i];
  }
  return userRoles;
};

module.exports.gameOutcome = (missionResults) => {
  // given mission results array, determine if good people won (true)

  const neededFailures = 3;

  // Filter out all false values. Take the length and
  // if it is greater than neededFailures return false (spies win).
  if (missionResults.filter(e => !e).length >= neededFailures) { return false; }
  // otherwise return true;
  return true;
};

module.exports.extraInfoAssignment = (userRoleMapping) => {
  var extraInfo = {};

  var spies = ['The Spies Are: '];
  var shpies = ['The Spies Except Mordred Are: '];
  var merlinAndMorgana = ['Merlin and Morgana Are: '];

  var players = ['The players are: '];

  /*
  { 'Minion of Mordred': [ '1', '0xQ50tVjCYAe-RyWAAAL' ],
  Mordred: [ '2', 'aKNOdPUk8zRHgUkbAAAP' ],
  'Loyal Servant': [ '5', 'Y9Ol8kqZuS7VMKgkAAAM' ],
  Merlin: [ '4', 'oZs4fGGn-7HfrnljAAAN' ] }
  */

  for (var prop in userRoleMapping) {
    if (prop === 'Minion of Mordred') {
      extraInfo[userRoleMapping[prop][1]] = spies;
      shpies.push(userRoleMapping[prop][0]);
      spies.push(userRoleMapping[prop][0]);
    } else if (prop === 'Mordred') {
      extraInfo[userRoleMapping[prop][1]] = spies;
      spies.push(userRoleMapping[prop][0]);
    } else if (prop === 'Merlin') {
      merlinAndMorgana.push(userRoleMapping[prop][0]);
      extraInfo[userRoleMapping[prop][1]] = shpies;
    } else if (prop === 'Morgana') {
      merlinAndMorgana.push(userRoleMapping[prop][0]);
      extraInfo[userRoleMapping[prop][1]] = spies;
      shpies.push(userRoleMapping[prop][0]);
      spies.push(userRoleMapping[prop][0]);
    } else if (prop === 'Percival') {
      extraInfo[userRoleMapping[prop][1]] = merlinAndMorgana;
    } else if (prop === 'Oberon') {
      shpies.push(userRoleMapping[prop][0]);
    }
  }
  return extraInfo;
}

module.exports.generateToken = () => {
  // generates and returns a random token.
  // used as the key to enter a room.

  // list containing numbers and characters for the random string
  const stringArray = ['0','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','k',
                    'o','p','q','r','s','t','u','v','w','x','y','z'];

  let token = '';
  // build a string with random characters with length of 6
	for (let i = 1; i <= 6; i++) {
		let randomNum = Math.ceil(Math.random() * stringArray.length) - 1;
		token = token + stringArray[randomNum];
	};

  return token;
}
