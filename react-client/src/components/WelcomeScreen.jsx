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
      var pages = {welcome: (<div id='welcomeScreen'>
     <h2> Welcome to Definitely Not Avalon </h2>

        
        

        <div className="welcomeScreenInput">
          <button onClick={this.host} >
            New Game
          </button>

          <button onClick={this.player} >
            Join
          </button>
        </div>

        <div id="rules">

          <table id="tableRules">
            <tr>
              <th>Mordred Team</th>
              <th>Merlin Team</th>
            </tr>
            <tr>
              <th style={{fontSize:'35px'}}>sabotage 3 missions to win</th>
              <th style={{fontSize:'35px'}}>succeed 3 missions to win</th>
            </tr>
            <tr>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/mordred.png)`}} ></div></td>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/merlin.png)`}} ></div></td>
            </tr>
            <tr>
              <td style={{fontSize:'35px'}}>Mordred</td>
              <td style={{fontSize:'35px'}}>Merlin</td>
            </tr>
            <tr>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/minionofmordred.png)`}} ></div></td>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/LoyalServant.png)`}} ></div></td>
            </tr>
            <tr>
              <td style={{fontSize:'35px'}}>Minion of Mordred</td>
              <td style={{fontSize:'35px'}}>Loyal Servant</td>
            </tr>
            <tr>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/morgana.png)`}} ></div></td>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/percival.png)`}} ></div></td>
            </tr>
            <tr>
              <td style={{fontSize:'35px'}}>Morgana</td>
              <td style={{fontSize:'35px'}}>Percival</td>
            </tr>
             <tr>
              <td><div className="photosRules" style={{content: `url(/styles/Resources/oberon.png)`}} ></div></td>
              <td></td>
            </tr>
            <tr>
              <td style={{fontSize:'35px'}}>Oberon</td>
              <td style={{fontSize:'35px'}}></td>
            </tr>
          </table>

          
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
