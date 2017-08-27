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

module.exports.gameIsFinished = (missionResults) => {
  // given mission results array, determine if good people won (true)

  const neededFailures = 3;
  const neededVictories = 3;

  // Filter out all false values. Take the length and
  // if it is greater than neededFailures return false (spies win).
  if (missionResults.filter(e => e === false).length >= neededFailures) {
    return false;
  } else if (missionResults.filter(e => e === true).length >= neededVictories) {
    return true;
  }
  return 'notyet';
};



var emptyPlayerInfo = function(userRoleMapping){

  var bad = { 
    'Mordred':'mordred', 
    'Minion of Mordred':'minionofmordred', 
    'Morgana': 'morgana', 
    'Oberon':'oberon' 
  };
  
  var good = {
    'Merlin':'merlin', 
    'Percival':'percival', 
    'Loyal Servant_1':'loyalservant_1', 
    'Loyal Servant_2':'loyalservant_2', 
    'Loyal Servant_3':'loyalservant_3', 
    'Loyal Servant_4':'loyalservant_4'
  };
  
  var mordredTeam = {};
  var merlinTeam = {};
  
  for (var key in userRoleMapping){
    if(bad[key]){
      mordredTeam[bad[key]] = [];
    } else {
      merlinTeam[good[key]] = [];
    }
  }
  
  return [mordredTeam, merlinTeam];
};


module.exports.extraInfoAssignment = (userRoleMapping) => {
  var extraInfo = {};

  for (var key in userRoleMapping){
    
    if ( key === 'Mordred' ){
      
      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      let userNameMordredTeam = [];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.mordred.push('yourself');
      
      // push array of mordred team expect oberon and yourself
      userNameMordredTeam.push(userRoleMapping['Minion of Mordred'][0]);
      if (Object.keys(mordredTeam).length > 2){
        userNameMordredTeam.push(userRoleMapping['Morgana'][0]);
      } 
      
      mordredTeam.minionofmordred = userNameMordredTeam;
      if (mordredTeam.morgana){
        mordredTeam.morgana = userNameMordredTeam;
      }
      
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam, 
        merlinTeam  
      };
      
      console.log(mordredTeam);
      console.log(merlinTeam);
      
    } else if (key === 'Minion of Mordred'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      let userNameMordredTeam = [];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.minionofmordred.push('yourself');
      
      // push array of mordred team expect oberon and yourself
      userNameMordredTeam.push(userRoleMapping['Mordred'][0]);
      if (Object.keys(mordredTeam).length > 2){
        userNameMordredTeam.push(userRoleMapping['Morgana'][0]);
      } 
      
      mordredTeam.mordred = userNameMordredTeam;
      if (mordredTeam.morgana){
        mordredTeam.morgana = userNameMordredTeam;
      }
      
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam, 
        merlinTeam  
      };
      
    } else if (key === 'Morgana'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      let userNameMordredTeam = [];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.morgana.push('yourself');
      
      // push array of mordred team expect oberon and yourself
      userNameMordredTeam.push(userRoleMapping['Mordred'][0]);
      userNameMordredTeam.push(userRoleMapping['Minion of Mordred'][0]);
      
      mordredTeam.mordred = userNameMordredTeam;
      mordredTeam.minionofmordred = userNameMordredTeam;
      
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam, 
        merlinTeam  
      };
      
    } else if (key === 'Oberon'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.mordred.push('unknown');
      
      mordredTeam.minionofmordred.push('unknown');
      if (mordredTeam.morgana){
        mordredTeam.morgana.push('unknown');
      }
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('yourself');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };
      
    } else if (key === 'Merlin'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      let userNameMordredTeam = [];

      merlinTeam.merlin.push('yourself');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      
      mordredTeam.mordred.push('unknown');


      // push array of mordred team expect oberon and yourself
      userNameMordredTeam.push(userRoleMapping['Minion of Mordred'][0]);
      
      if (Object.keys(mordredTeam).length === 3){
        userNameMordredTeam.push(userRoleMapping['Morgana'][0]);
      } 
      if (Object.keys(mordredTeam).length === 4){
        userNameMordredTeam.push(userRoleMapping['Morgana'][0]);
        userNameMordredTeam.push(userRoleMapping['Oberon'][0]);
      } 

      mordredTeam.minionofmordred = userNameMordredTeam;
      if (mordredTeam.morgana){
        mordredTeam.morgana = userNameMordredTeam;
      }
      if (mordredTeam.oberon){
        mordredTeam.oberon = userNameMordredTeam;
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };
      
    } else if (key === 'Percival'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      let morganMerlinUserName = [];
      
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('yourself');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.mordred.push('unknown');
      
      mordredTeam.minionofmordred.push('unknown');

      morganMerlinUserName.push(userRoleMapping['Morgana'][0]);
      morganMerlinUserName.push(userRoleMapping['Merlin'][0]);
      mordredTeam.morgana = morganMerlinUserName;
      merlinTeam.merlin = morganMerlinUserName;

      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };
      
    } else if (key === 'Loyal Servant_1'){
      
      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('yourself');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.mordred.push('unknown');
      
      mordredTeam.minionofmordred.push('unknown');
      if (mordredTeam.morgana){
        mordredTeam.morgana.push('unknown');
      }
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };

    } else if (key === 'Loyal Servant_2'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('yourself');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.mordred.push('unknown');
      
      mordredTeam.minionofmordred.push('unknown');
      if (mordredTeam.morgana){
        mordredTeam.morgana.push('unknown');
      }
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };
      
    } else if (key === 'Loyal Servant_3'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('yourself');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('unknown');
      }
      mordredTeam.mordred.push('unknown');
      
      mordredTeam.minionofmordred.push('unknown');
      if (mordredTeam.morgana){
        mordredTeam.morgana.push('unknown');
      }
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };
      
    } else if (key === 'Loyal Servant_4'){

      let merlinTeam = emptyPlayerInfo(userRoleMapping)[1];
      let mordredTeam = emptyPlayerInfo(userRoleMapping)[0];
      
      merlinTeam.merlin.push('unknown');
      merlinTeam.loyalservant_1.push('unknown');
      merlinTeam.loyalservant_2.push('unknown');
      if (merlinTeam.percival){
        merlinTeam.percival.push('unknown');
      }
      if (merlinTeam.loyalservant_3){
        merlinTeam.loyalservant_3.push('unknown');
      }
      if (merlinTeam.loyalservant_4){
        merlinTeam.loyalservant_4.push('yourself');
      }
      mordredTeam.mordred.push('unknown');
      
      mordredTeam.minionofmordred.push('unknown');
      if (mordredTeam.morgana){
        mordredTeam.morgana.push('unknown');
      }
      if (mordredTeam.oberon){
        mordredTeam.oberon.push('unknown');
      }
      
      extraInfo[userRoleMapping[key][1]] = {
        mordredTeam,
        merlinTeam  
      };
      
    }
  }


  // var spies = ['The Spies Are: '];
  // var shpies = ['The Spies Except Mordred Are: '];
  // var merlinAndMorgana = ['Merlin and Morgana Are: '];

  // for (var prop in userRoleMapping) {
  //   if (prop === 'Minion of Mordred') {
  //     extraInfo[userRoleMapping[prop][1]] = spies;
  //     shpies.push(userRoleMapping[prop][0]);
  //     spies.push(userRoleMapping[prop][0]);
  //   } else if (prop === 'Mordred') {
  //     extraInfo[userRoleMapping[prop][1]] = spies;
  //     spies.push(userRoleMapping[prop][0]);
  //   } else if (prop === 'Merlin') {
  //     merlinAndMorgana.push(userRoleMapping[prop][0]);
  //     extraInfo[userRoleMapping[prop][1]] = shpies;
  //   } else if (prop === 'Morgana') {
  //     merlinAndMorgana.push(userRoleMapping[prop][0]);
  //     extraInfo[userRoleMapping[prop][1]] = spies;
  //     shpies.push(userRoleMapping[prop][0]);
  //     spies.push(userRoleMapping[prop][0]);
  //   } else if (prop === 'Percival') {
  //     extraInfo[userRoleMapping[prop][1]] = merlinAndMorgana;
  //   } else if (prop === 'Oberon') {
  //     shpies.push(userRoleMapping[prop][0]);
  //   }
  // }
  
  //console.log(extraInfo);

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
