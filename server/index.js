var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');

var helpers = require('./helper-functions');
var database = require('../database-mysql');
io.on('connection', (socket) => {

  socket.on('join', (data) => {
    database.getAllUsernames(data.roomname, (allplayers) => {
      if (allplayers.indexOf(data.username) > -1) {
        socket.emit('username exists', {});
      } else {
        socket.join(data.roomname);
        database.addPlayer(data.roomname, false, data.username, socket.id, () => {
          database.getAllUsernames(data.roomname, (allplayers) => {
            socket.to(data.roomname).emit('playerjoined', {allplayers})
            var accessCode = data.roomname;
            socket.emit('newplayer', {username: data.username, allplayers, accessCode})
          });
        });
      }
    });
  });

  socket.on('create', (data) => {
    var accessCode = helpers.generateToken();
    socket.join(accessCode);
    database.createGame(accessCode, () => {
      var allplayers = [data.username];
      database.addPlayer(accessCode, true, data.username, socket.id, () => {
        socket.emit('newgame', {username: data.username, accessCode, allplayers});
      });
    });
  });

  socket.on('disconnect', () => {
    database.removePlayer(socket.conn.id, (gameToken, host) => {
      database.getAllUsernames(gameToken, (allplayers) => {
        io.in(gameToken).emit('playerjoined', {allplayers})
        if (host) {
          database.getSocketId(allplayers[0], gameToken, (socketid) => {
            database.updateHost(gameToken, () => {
              socket.to(socketid).emit('become host', {});
            });
          });
        }
      });
    });
  });

  socket.on('player left', (data) => {
    socket.leave(data.roomname);
    database.removePlayer(socket.id, (gameToken, host) => {
      database.getAllUsernames(gameToken, (allplayers) => {
        if (host) {
          database.getSocketId(allplayers[0], gameToken, (socketid) => {
            database.updateHost(gameToken, () => {
              socket.to(socketid).emit('become host', {});
            });
          });
        }
        io.in(gameToken).emit('playerjoined', {allplayers})
      });
    });
    socket.emit('welcome', {});
  });

  socket.on('start game', (data) => {
    database.updateVotesAndParticipantNum(data.roomname, () => {
      database.getAllSocketIds(data.roomname, (socketids) => {
        database.votesNeeded(data.roomname, (votesNeeded, numPeopleOnMissions, voteTrack) => {
          var roles = helpers.generateRoles(socketids);
          var userRoles = {};
          database.getAllPlayers(data.roomname, (users) => {
            for (var i = 0; i < users.length; i++) {
              userRoles[roles[users[i].dataValues.socketid]] = [users[i].dataValues.username, users[i].dataValues.socketid];
            }
            var extraInfoAssignment = helpers.extraInfoAssignment(userRoles);
            database.getResults(data.roomname,(history) => {
              database.getHost(data.roomname, (host) => {
                console.log('host from start game: ', host)
                socket.emit('hoststart', {role: roles[socket.id], history: history, hostName: host.username, voteTrack: voteTrack, numPeopleOnMissions: numPeopleOnMissions, missionSize: votesNeeded, extraInfo: extraInfoAssignment[socket.id]});
                for (var i = 0; i < socketids.length; i++) {
                  database.assignRole(socketids[i], roles[socketids[i]], () => {
                  });
                  if (socketids[i] !== socket.id) {
                    socket.to(socketids[i]).emit('playerstart', {role: roles[socketids[i]], hostName: host.username, voteTrack: voteTrack, history: history, numPeopleOnMissions: numPeopleOnMissions, missionSize: votesNeeded, extraInfo: extraInfoAssignment[socketids[i]]});
                  }
                }
              })
            });
          });
        });
      });
    });
  });

  socket.on('questApprovalNeeded', (data) => {
    io.in(data.roomname).emit('questApprovalNeeded', data);
  });

  socket.on('missionparticipants', (data) => {
    console.log('is this running?: in server- missionparticipants ')
    io.in(data.roomname).emit('nomissionwaiting', {})
    for (var i = 0; i < data.participants.length; i++) {
      database.getSocketId(data.participants[i], data.roomname, (socketid) => {
        if (socketid === socket.id) {
          socket.emit('missionvote', {missionPlayers: data.participants})
        } else {
          socket.to(socketid).emit('missionvote', {missionPlayers: data.participants});
        }
      });
    };
  });

//may be blocking server because callback is only called in once all votes are in.
  const computeResult = (data, callback) => {
    database.addVote(data.roomname, data.vote, (votesArray) => {
      database.votesNeeded(data.roomname, (votesNeeded) => {
        if (votesArray.length === votesNeeded) {
          database.votingInfo(data.roomname, (numPlayers, missionNumber) => {
            var finalMissionResult = helpers.missionResult(numPlayers, missionNumber, votesArray); // need a change from helper function
            callback(finalMissionResult, votesArray);
          });
        }
      });
    });
  };

  const computeQuestResult = (data, callback) => {
    database.addQuestVote(data.roomname, data.vote, (numPlayers, questApprovalArray)=>{
      if (numPlayers === questApprovalArray.length) {
        database.resetQuestVote(data.roomname);
        var questProposalPassed = helpers.questMemberApproval(numPlayers, questApprovalArray);
        callback(true, questProposalPassed, questApprovalArray);
      }
      callback(false);
    });
  };

  socket.on('quest vote', (data) => {
    computeQuestResult(data, (isFinalVote, questProposalPassed, votesArray) => {
        if(isFinalVote) {
          if (questProposalPassed) {
            //add approved to board
            database.updateVoteTrack(data.roomname, true, (voteTrack) => {
              database.updateHost(data.roomname, (hostName) => {
                var host = hostName.username;
                console.log('hostname in quest vote: ', host)
                //send nomission signal to everyone, but not to self.

                socket.emit('nomissionwaiting', {voteTrack, hostName: host, missionPlayers: data.participants})
                //used io.in instead of socket.to(id) because don't want to use db.getSocketId
                io.in(data.roomname).emit('nomissionwaiting', {voteTrack, hostName: host, missionPlayers: data.participants})

                for (var i = 0; i < data.participants.length; i++) {
                  database.getSocketId(data.participants[i], data.roomname, (socketid) => {
                    if (socketid === socket.id) {
                      socket.emit('missionvote', {voteTrack, hostName: host, missionPlayers: data.participants});
                    } else {
                      socket.to(socketid).emit('missionvote', {voteTrack, hostName: host, missionPlayers: data.participants});
                    }
                  });
                };
              });
            });
          } else {
            //if this is the final vote, but the quest proposal was not passed.
            //change host and add dissapproved to board and send back to entermissionplayer
            database.updateVoteTrack(data.roomname, false, (voteTrack) => {
              database.updateHost(data.roomname, (hostName) => {
                //need to emit to return to entermissionplayer for host and discussmissionplayer for nonhost
                var host = hostName.username;
                var hostSocketId = hostName.socketid;

                socket.emit('nextroundplayerstart', {host: false, hostName: host, voteTrack: voteTrack});
                io.in(data.roomname).emit('nextroundplayerstart', {host: false, hostName: host, voteTrack: voteTrack});

                for (var i = 0; i < data.participants.length; i++) {
                  database.getSocketId(data.participants[i], data.roomname, (socketid) => {
                    if (socket.id === socketid) {
                      socket.emit('nextroundhoststart', {host: true, hostName: host, voteTrack: voteTrack});
                    } else {
                      socket.to(hostSocketId).emit('nextroundhoststart', {host: true, hostName: host, voteTrack: voteTrack});
                    }
                  });
                }
              });
            });
          }
        }
    });
  });

  socket.on('missionvote', (data) => {
    computeResult(data, (finalMissionResult, votesArray) => {
      database.updateResults(data.roomname, finalMissionResult, (results) => {
        // returns false if number of fails is 3 or more
        // returns true if number of wins is 3 or more
        // return 'notyet' otherwise
        database.getHost(data.roomname, (host) => {
          var threeWinsOrFails = helpers.gameIsFinished(results);
          if (threeWinsOrFails === 'notyet' && results.length < 5) {
            database.nextMission(data.roomname, (votesNeeded) => {
              io.in(data.roomname).emit('missionresult', {hostName: host.username, results: votesArray, missionSize: votesNeeded, questHistory: results});
            });
          } else {
            var finalOutcome = helpers.gameIsFinished(results);
            if (finalOutcome === true) {
              io.in(data.roomname).emit('waitmerlinchoice', {hostName: host.username, questHistory: results});
              database.getMordred(data.roomname, (mordred) => {
                if (mordred.socketid === socket.id) {
                  socket.emit('entermerlin', {hostName: host.username, results: votesArray, questHistory: results});
                } else{
                    socket.to(mordred.socketid).emit('entermerlin', {hostName: host.username, results: votesArray, questHistory: results});
                }
              });
            } else {
              database.getAllPlayers(data.roomname, (users) => {
                var allPlayers = {};
                for (var i = 0; i < users.length; i++) {
                  allPlayers[users[i].dataValues.username] = users[i].dataValues.role;
                }
                var results = votesArray;
                io.in(data.roomname).emit('finaloutcome', {hostName: host.username, finalOutcome, results, allPlayers, questHistory: results});
              });
            }
          }
        });
      });
    });
  });

  socket.on('merlinselection', (data) => {
    database.getMerlin(data.roomname, (merlin) => {
      var merlinGuessed = (merlin.username === data.choice);
      database.getAllPlayers(data.roomname, (users) => {
        var allPlayers = {};
        for (var i = 0; i < users.length; i++) {
          allPlayers[users[i].dataValues.username] = users[i].dataValues.role;
        }
        io.in(data.roomname).emit('merlinfinaloutcome', {merlinGuessed, allPlayers});
      });
    });
  });

  socket.on('newGame', (data) => {
    database.clearGame(data.roomname, () => {
    socket.emit('play again', {})
    });
  });
});



app.use(express.static(__dirname + '/../react-client/dist'));

var port =  process.env.PORT || 3000;


server.listen(port, () => {
  console.log('listening to port 3000');
});
