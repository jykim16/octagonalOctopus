import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import GameOwnerEnterNameScreen from './components/GameOwnerEnterNameScreen.jsx';
import PlayerEnterNameScreen from './components/PlayerEnterNameScreen.jsx';
import GameOwnerWaitingForPlayersScreen from './components/GameOwnerWaitingForPlayersScreen.jsx';
import PlayerWaitingForPlayersScreen from './components/PlayerWaitingForPlayersScreen.jsx';
import DiscussMissionPlayersScreen from './components/DiscussMissionPlayersScreen.jsx';
import EnterMissionPlayersScreen from './components/EnterMissionPlayersScreen.jsx';
import MissionVoteScreen from './components/MissionVoteScreen.jsx';
import AwaitMissionOutcomeScreen from './components/AwaitMissionOutcomeScreen.jsx';
import MissionOutcomeScreen from './components/MissionOutcomeScreen.jsx';
import AwaitAssassinScreen from './components/AwaitAssassinScreen.jsx';
import MerlinChoiceScreen from './components/MerlinChoiceScreen.jsx';
import InfoPanel from './components/InfoPanel.jsx';
import openSocket from 'socket.io-client';
import ApproveQuestScreen from './components/ApproveQuestScreen.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.waitingPage = this.waitingPage.bind(this);

    this.socket = openSocket();
    //new game created by host

    this.socket.on('newgame', (data)=>{
      this.setState({accessCode: data.accessCode,
                      username: data.username,
                      players: data.allplayers,
                      pageID: 'GameOwnerWaitingForPlayersScreen'
                    });
    });


    this.socket.on('updateState', (data)=>{
      this.setState({roomname: data.roomname,
                    id: data.id});
    });

    this.socket.on('username exists', (data) => {
      alert('someone took this name! plz choose another');
    })

    //player tryingt to join game
    this.socket.on('newplayer', (data)=>{
      this.setState({players: data.allplayers,
                    accessCode: data.accessCode,
                    username: data.username,
                    pageID: 'PlayerWaitingForPlayersScreen'
                    });
    });

    this.socket.on('playerjoined', (data) => {
      this.setState({players: data.allplayers});
    });

    this.socket.on('become host', (data) => {
      this.setState({host: true,
                    pageID: 'GameOwnerWaitingForPlayersScreen'
      });
    });

    //host presses start and moves to page where he can enter the names
    this.socket.on('hoststart', (data)=>{

      console.log('hoststart: ', data.extraInfo);

      this.setState({role: data.role,
                    host: true,
                    history: data.history,
                    hostName: data.hostName,
                    questHistory: data.history,
                    numPeopleOnMissions: data.numPeopleOnMissions,
                    voteTrack: data.voteTrack,
                    missionSize: data.missionSize,
                    extraInfo: data.extraInfo,
                    pageID: 'EnterMissionPlayersScreen',
                    missionOutcome: [],
                    gameOutcome: '',
                  });
    });

    this.socket.on('nextroundhoststart', (data)=>{
      this.setState({
        hostName: data.hostName,
        voteTrack: data.voteTrack,
        pageID: 'EnterMissionPlayersScreen'
      });
    });

    this.socket.on('nextroundplayerstart', (data)=>{
      this.setState({
        hostName: data.hostName,
        voteTrack: data.voteTrack,
        pageID: 'DiscussMissionPlayersScreen'
        });
    });

    //players should be moved to the next page after host starts
    this.socket.on('playerstart', (data)=>{

      console.log('playerstart: ', data.extraInfo);

      this.setState({role: data.role,
                      history: data.history,
                      questHistory: data.history,
                      numPeopleOnMissions: data.numPeopleOnMissions,
                      voteTrack: data.voteTrack,
                      missionSize: data.missionSize,
                      extraInfo: data.extraInfo,
                      pageID: 'DiscussMissionPlayersScreen',
                      missionOutcome: [],
                      gameOutcome: '',
                      hostName: data.hostName
                  });
    });

    //players vote on passing the quest members or not
    this.socket.on('questApprovalNeeded', (data)=>{
      this.setState({missionPlayers: data.participants,
                      hostName: data.hostName,
                      pageID: 'ApproveQuestScreen'});
    });

    //players on mission should go to voting page
    this.socket.on('missionvote', (data)=>{
      this.setState({missionPlayers: data.missionPlayers,
                    host: this.state.username === data.hostName,
                    voteTrack: data.voteTrack,
                    pageID: 'MissionVoteScreen',
                    hostName: data.hostName,
                    roomname: data.roomname});
    });

    //players not on mission go here i dont need data i just need you to emit to setState
    this.socket.on('nomissionwaiting', (data)=>{
      this.setState({pageID: 'AwaitMissionOutcomeScreen',
                    voteTrack: data.voteTrack,
                    hostName: data.hostName,
                    host: this.state.username === data.hostName
      });
    });

    //send them back to welcome page if they hit back
     this.socket.on('welcome', (data)=>{
      this.setState({pageID: 'WelcomeScreen'});
    });

    //result of mission
    this.socket.on('missionresult', (data)=>{
      var pass = 0;
      var fail = 0;
      data.results.forEach((vote)=>{
        vote ? pass++ : fail++;
      });
      var history = [`${pass} pass ${fail} fail`];
      this.setState({failVotes: fail,
                      successVotes: pass,
                      missionSize: data.missionSize,
                      missionOutcome: this.state.missionOutcome.concat([history]),
                      questHistory: data.questHistory,
                      pageID: 'MissionOutcomeScreen'});
    });

    this.socket.on('pressedleave', (data)=>{
      this.setState({pageID: 'WelcomeScreen'});
    });

    this.socket.on('entermerlin', (data) => {
      var pass = 0;
      var fail = 0;
      data.results.forEach((vote)=>{
        vote ? pass++ : fail++;
      });
      var history = [`${pass} pass ${fail} fail`];

      this.setState({pageID: 'MerlinChoiceScreen',
                    missionOutcome: this.state.missionOutcome.concat([history])});
    });

    this.socket.on('waitmerlinchoice', (data) => {
      this.setState({
        pageID: 'AwaitAssassinScreen'

      });
    });

    this.socket.on('finaloutcome', (data) => {
      var pass = 0;
      var fail = 0;
      data.results.forEach((vote)=>{
        vote ? pass++ : fail++;
      });
      var history = [`${pass} pass ${fail} fail`];

      this.setState({ gameOutcome: data.finalOutcome,
                      playerRoleMapping: data.allPlayers,
                      missionOutcome: this.state.missionOutcome.concat([history])
                    }, () => {
                        this.setState({pageID: 'GameOutcomeScreen'})
                      });
    });

    this.socket.on('merlinfinaloutcome', (data) => {
      this.setState({ merlinChoice: data.merlinGuessed,
                      playerRoleMapping: data.allPlayers,
                      pageID: 'GameOutcomeScreen'});
    });

    this.socket.on('play again', (data) => {
      if (this.state.host) {
        this.setState({pageID: 'GameOwnerWaitingForPlayersScreen'}, () => {
        });
      } else {
        this.setState({pageID: 'PlayerWaitingForPlayersScreen'}, () => {
        });
      }
    });

    this.socket.on('quest approved', (data) => {
      if (this.state.host) {
        this.setState({pageID: 'GameOwnerWaitingForPlayersScreen'}, () => {
        });
      } else {
        this.setState({pageID: 'PlayerWaitingForPlayersScreen'}, () => {
        });
      }
    });
    this.state = {

      pageID: 'WelcomeScreen',

      players: [],

      role: '',

      spyCount: 3,

      accessCode: '',

      missionPlayers: [],

      missionSize: 3,

      failVotes: 0,

      successVotes: 0,

      host: false,

      username: '',

      missionOutcome: [],

      gameOutcome: '',

      playerRoleMapping: '',

      merlinChoice: null,

      extraInfo: null,

      numPeopleOnMissions: null,

      voteTrack: '{"0":[], "1":[], "2":[], "3":[], "4":[]}',

      questHistory: [],

      hostName: null

    };

  this.screenDispatch = {

    PlayerEnterNameScreen: ()=> {
      return (
        <PlayerEnterNameScreen
        socket={this.socket}
        currPlayers = {this.state.players}
        />
    )},

    GameOwnerEnterNameScreen: ()=> {

      return (
        <GameOwnerEnterNameScreen
        socket={this.socket}
        />
    )},

    AwaitAssassinScreen: ()=> {

      return (
        <AwaitAssassinScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          role={this.state.role}
          history={this.state.missionOutcome}
          spyCount={this.state.spyCount}
          socket={this.socket}
          roomname={this.state.accessCode}
        />
      )},

    AwaitMissionOutcomeScreen: ()=> {

      return (
        <AwaitMissionOutcomeScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          role={this.state.role}
          history={this.state.missionOutcome}
          socket={this.socket}
          roomname={this.state.accessCode}
          host={this.state.host}
        />
      )},


    DiscussMissionPlayersScreen: ()=> {

      console.log('DiscussMissionPlayersScreen: ', this.state.extraInfo);

      return (
        <DiscussMissionPlayersScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          missionSize={this.state.missionSize}
          role={this.state.role}
          socket={this.socket}
          roomname={this.state.accessCode}
          history={this.state.missionOutcome}
          extraInfo = {this.state.extraInfo}
        />
      )},


    EnterMissionPlayersScreen: ()=> {

      console.log('EnterMissionPlayersScreen: ', this.state.extraInfo);

      return (
        <EnterMissionPlayersScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          missionSize={this.state.missionSize}
          role={this.state.role}
          history={this.state.missionOutcome}
          socket={this.socket}
          players={this.state.players}
          roomname={this.state.accessCode}
          extraInfo = {this.state.extraInfo}
        />

      )},


    GameOutcomeScreen: ()=> {

      return (

        <GameOutcomeScreen
        merlinchoice={this.state.merlinChoice}
        role={this.state.role}
        history={this.state.missionOutcome}
        socket={this.socket}
        playermap={this.state.playerRoleMapping}
        gameresult={this.state.gameOutcome}
        roomname={this.state.accessCode}
        />
      )},

    GameOwnerWaitingForPlayersScreen: ()=> {

      return (
        <GameOwnerWaitingForPlayersScreen
        gameresult={this.state.gameOutcome}
        role={this.state.role}
        history={this.state.missionOutcome}
        accessCode={this.state.accessCode}
        players={this.state.players}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},


    MerlinChoiceScreen: ()=> {

      return (
        <MerlinChoiceScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          players={this.state.players}
          role={this.state.role}
          history={this.state.missionOutcome}
          spyCount={this.state.spyCount}
          socket={this.socket}
          roomname={this.state.accessCode}
        />
      )},


    MissionOutcomeScreen: ()=> {

      console.log('MissionOutcomeScreen: ', this.state.extraInfo);

      return (

        <MissionOutcomeScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          role={this.state.role}
          history={this.state.missionOutcome}
          failVotes={this.state.failVotes}
          successVotes={this.state.successVotes}
          socket={this.socket}
          roomname={this.state.accessCode}
          nextPage={this.nextPage}
          host = {this.state.host}
          extraInfo = {this.state.extraInfo}
        />
      )},

    ApproveQuestScreen: () => {
      return (
        <ApproveQuestScreen
          hostName = {this.state.hostName}
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          players={this.players}
          role={this.state.role}
          history={this.state.missionOutcome}
          socket={this.socket}
          roomname={this.state.accessCode}
          missionPlayers = {this.state.missionPlayers}
          waiting={this.waitingPage}
          extraInfo = {this.state.extraInfo}
          />
      );
    },

    MissionVoteScreen: ()=> {

      console.log('MissionVoteScreen: ', this.state.extraInfo);

      return (
        <MissionVoteScreen
          numPeopleOnMissions={this.state.numPeopleOnMissions}
          questHistory= {this.state.questHistory}
          voteTrack={this.state.voteTrack}
          players={this.players}
          role={this.state.role}
          history={this.state.missionOutcome}
          socket={this.socket}
          roomname={this.state.accessCode}
          missionPlayers = {this.state.missionPlayers}
          waiting={this.waitingPage}
          extraInfo = {this.state.extraInfo}
        />
      )},

    PlayerWaitingForPlayersScreen: ()=> {

      return (
        <PlayerWaitingForPlayersScreen
        players={this.state.players}
        socket={this.socket}
        roomname={this.state.accessCode}
        />
      )},


    WelcomeScreen: ()=> {

      return (
        <WelcomeScreen
        socket={this.socket}
        />
      )}
    }
  }

  nextPage(pageID) {
    this.setState({pageID})
  }

  waitingPage() {
    this.setState({pageID: 'AwaitMissionOutcomeScreen'});
  }

  render () {
    return (
        <div>
        {this.screenDispatch[this.state.pageID]()}
      </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
