import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';

class AwaitAssassinScreen extends React.Component {

  constructor(props) {
    super(props);

    this.spyCount = 3; // Needs to be passed down appropriately
  }

  render() {

    return (
      <div id="awaitAssassinScreen">

        <h3> Awaiting Mordred </h3>
        
        <InfoPanel role={this.props.role} missionHistory={this.props.history} />
        
        

      </div>
    )}
}

export default AwaitAssassinScreen;
