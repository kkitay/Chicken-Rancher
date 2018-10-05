import React from 'react';
import {connect} from 'react-redux';
import Chicken from './Chicken';
import Incubator from '../egg/Incubator';
import './Coop.css';

const mapStateToProps = state => {
  return {
    chickens: state.chickens
  };
}

class Coop extends React.Component {
  render() {
    const chickens = this.props.chickens;
    let liveChickens = Object.values(chickens).filter(c => !c.dead);
    if(liveChickens.length > 0) {
      return (
        <div className="Coop">
          {liveChickens.map(c => <Chicken key={c.id} id={c.id} />)}
          <Incubator />
        </div>
      );
    } else {
      return (
        <div className="GameOver">
          Game Over
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(Coop);