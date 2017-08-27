import React from 'react';
import GameOwnerEnterNameScreen from './GameOwnerEnterNameScreen.jsx';
import PlayerEnterNameScreen from './PlayerEnterNameScreen.jsx';
class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: 'welcome'};
    this.player = this.player.bind(this);
    this.host = this.host.bind(this);
    this.pageSelector =this.pageSelector.bind(this);
    this.goBack = this.goBack.bind(this);
  }


  player(){
    this.setState({page:'join'});
    }

    host(){
      this.setState({page:'newgame'});
    }

    goBack(){
      this.setState({page: 'welcome'});
    }

    pageSelector(key) {
      var pages = {welcome: (
    <div id='welcomeScreen'>
      <div className="welcomeScreenControlPanel">
      <h2> Welcome to Definitely Not Avalon </h2>

      <div className="welcomeScreenInput">
        <button onClick={this.host} >
          New Game
        </button>

        <button onClick={this.player} >
          Join
        </button>
      </div>
      </div>

      <div className="teams">
        <div className="welcomeScreenTeams">.: Merlin Team :.</div>
        <div className="row-fluid">
          <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/merlin.png)`}}></div>
          <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/percival.png)`}}></div>
          <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/loyalservant.png)`}}></div>
          <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/loyalservant_2.png)`}}></div>
        </div>


          <div className="welcomeScreenTeams">.: Mordred Team :.</div>
          <div className="row-fluid">
            <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/mordred.png)`}}></div>
            <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/oberon.png)`}}></div>
            <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/morgana.png)`}}></div>
            <div className="bottom col-xs-6 col-md-3" style={{content: `url(/styles/Resources/minionofmordred.png)`}}></div>
          </div>
        </div>

      </div>
    ),
    newgame: (<GameOwnerEnterNameScreen
        socket={this.props.socket}
        back={this.goBack}
        />),
    join: (<PlayerEnterNameScreen
        socket={this.props.socket}
        back={this.goBack}
        />)
      }
    return pages[key];
    }


  render() {


    return (
      <div>
      {this.pageSelector(this.state.page)}
      </div>
    )}
}

export default WelcomeScreen;
