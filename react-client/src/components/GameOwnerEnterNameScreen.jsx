import React from 'react';

class GameOwnerEnterNameScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameFormValue: '',
      pageID: 'now'
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gettingHostUsername = this.gettingHostUsername.bind(this);
    this.backtoWelcome = this.backtoWelcome.bind(this);
  }


  handleNameChange(event) {
    this.setState({nameFormValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  gettingHostUsername(event){
    this.props.socket.emit('create', {username: this.state.nameFormValue});
  }

  backtoWelcome(){
    this.props.back();
  }

  render() {

    return (
      <div id="gameOwnerEnterNameScreen">

        <h2> Please Enter your Name </h2>

        <div className="gameOwnerEnterNameScreenForm">
          <form onSubmit={this.handleSubmit} >
            <input
              type="text"
              name="Name"
              placeholder="Your Name" 
              value={this.state.nameFormValue}
              onChange={this.handleNameChange}
              />

            <input type="submit" value="Submit" onClick={this.gettingHostUsername}/>
          </form>

          <button className="backButton" onClick={this.backtoWelcome}>
            Back
          </button>
        </div>
      </div>
    )}
}

export default GameOwnerEnterNameScreen;
