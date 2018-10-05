import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {addTime} from '../actions/ranch';
import {ranchConstants} from '../constants';
import Coop from '../chicken/Coop';
import Graveyard from '../chicken/Graveyard';
import './Ranch.css';

const mapDispatchToProps = dispatch => {
  return {
    addTime: time => dispatch(addTime(time))
  }
}

class Ranch extends React.Component {
  // TIME CYCLE
  cycle = () => {
    // increase time
    this.props.addTime(1);
    
    // CHECK INCUBATOR -- happens in Incubator component
    // continue if there's an egg in the incubator
    // if time = 0, reset incubator and send action to hatch a chick
    // if time > 0, decrement timer
  }

  // MOUNT RANCH
  componentDidMount = () => {
    this.ranchInterval = setInterval(
      () => this.cycle(),
      ranchConstants.GAME_CYCLE_MS
    );
    // dispatch initialization for Ranch, Chickens on mount to create initial state
    //dispatch(initialize())
  }

  // UNMOUNT RANCH
  componentWillUnmount = () => {
    clearInterval(this.ranchInterval);
  }

  render() {
    return (
      <div className="Ranch">
        <Header />
        <Coop />
        <Graveyard />
        <div id="credit">by <a href="https://twitter.com/kkitay" target="_blank" rel="noopener noreferrer">@kkitay</a></div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Ranch);