import React from 'react';
//import styles from '../../dist/styles/styles.css';

class RenderPhotos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var styles = {backgroundImage: `url(${this.props.role}.png)`}

    return (
        <div style={console.log(styles), styles}></div>
    )
  }

}

export default RenderPhotos;