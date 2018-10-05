import React from 'react';
import {connect} from 'react-redux';
import './Graveyard.css';

const mapStateToProps = state => {
  return {
    chickens: state.chickens
  };
}

class Graveyard extends React.Component {
  render() {
    const chickens = this.props.chickens;
    let deadChickens = Object.values(chickens).filter(c => c.dead);
    if(deadChickens.length > 0) {
      return (
        <div className="Graveyard">
          {deadChickens.map(c => <p key={c.id}>{c.name} is dead</p>)}
        </div>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps)(Graveyard);