import React from 'react';

class Cards extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log('extra Info: ', this.props.extraInfo);

    var mordredTeam = this.props.extraInfo.mordredTeam;
    var merlinTeam = this.props.extraInfo.merlinTeam;
    /*
    Example for Morgana:
    {
      mordredTeam:{mordred:['3','10'], minionofmordred:['3','10'], morgana:['yourself'], oberon:['unknown']}
      merlinTeam:{merlin:['unknown'], LoyalServant:['unknown'], percival:['unknown']}
    }
    */


    
    

    return (
    <div id="cards">
      <table id="tableRules">
        <tbody>
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
            <td style={{fontSize:'35px'}}>Mordred is: {mordredTeam.mordred.join(' or ')}</td>
            <td style={{fontSize:'35px'}}>Merlin is: {merlinTeam.merlin[0]}</td>
          </tr>
          <tr>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/minionofmordred.png)`}} ></div></td>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/loyalservant.png)`}} ></div></td>
          </tr>
          <tr>
            <td style={{fontSize:'35px'}}>Minion of Mordred is: {mordredTeam.minionofmordred[0]}</td>
            <td style={{fontSize:'35px'}}>Loyal Servant is: {merlinTeam.loyalservant_1[0]}</td>
          </tr>
          <tr>
            <td></td>
            <td><div className="photosRules" style={{content: `url(/styles/Resources/loyalservant_2.png)`}} ></div></td>
          </tr>
          <tr>
            <td style={{fontSize:'35px'}}></td>
            <td style={{fontSize:'35px'}}>Loyal Servant is: {merlinTeam.loyalservant_2[0]}</td>
          </tr>
        </tbody>  
      </table>
    </div>
    )}
}

export default Cards;