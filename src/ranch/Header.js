import React from 'react';
import { connect } from 'react-redux';
import PrettyAge from '../common/PrettyAge';

const mapStateToProps = state => {
  return {
    gold: state.ranch.gold,
    time: state.ranch.time,
    chickens: state.chickens,
  };
}

const Header = ({ gold, time, chickens }) => {
  let liveChickens = Object.values(chickens).filter(c => !c.dead).length;
  return (
  <div className="Header">
    <h1>
      You have {gold}G.
      {liveChickens < 15
      ? <span>You are {liveChickens}/15 chickens from being a great chicken rancher.</span>
      : <span>You are a great chicken rancher! Congratulations!</span>
      }
    </h1>
    <PrettyAge time={time} long />
  </div>
  );
}

export default connect(mapStateToProps)(Header);