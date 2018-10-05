import React from 'react';
import {connect} from 'react-redux';
import './Chicken.css';
import classNames from 'classnames';
import Sprite from '../common/Sprite';
import EggTrain from '../egg/EggTrain';
import {feedChicken, makeHungry, killChicken} from '../actions/chicken';
import {spendGold} from '../actions/ranch';
import {layEgg} from '../actions/egg';
import {chickenConstants} from '../constants';

const mapDispatchToProps = dispatch => {
  return {
    feedChicken: (id, timestamp) => dispatch(feedChicken(id, timestamp)),
    makeHungry: (id, timestamp) => dispatch(makeHungry(id, timestamp)),
    killChicken: id => dispatch(killChicken(id)),
    spendGold: amount => dispatch(spendGold(amount)),
    layEgg: chicken => dispatch(layEgg(chicken)),
  }
}

const mapStateToProps = (state, props) => {
  return {
    time: state.ranch.time,
    gold: state.ranch.gold,
    chicken: state.chickens[props.id]
  }
}

class Chicken extends React.Component {
   componentDidUpdate(prevProps) {
    // must be new time
    if(this.props.time === prevProps.time) return;

    // calculate age; make chicken
    let chicken = { ...this.props.chicken, age: (this.props.time - this.props.chicken.born) };

    // skip young and dead chickens
    if(chicken.age < chickenConstants.YOUNG_AGE || chicken.dead) return;
    
    // get hungry
    if(chicken.age > chickenConstants.YOUNG_AGE && !chicken.lastHungry && Math.random() < chickenConstants.CHANCE_HUNGRY) {
      prevProps.makeHungry(chicken.id, this.props.time);
    }

    // lay egg
    if(!chicken.lastHungry && Math.random() < chickenConstants.CHANCE_LAY) {
      prevProps.layEgg(chicken.id);
    }

    // die
    if(chicken.lastHungry && this.props.time - chicken.lastHungry > chickenConstants.TIME_TO_DEATH) {
      prevProps.killChicken(chicken.id);
    }
  }

  // onclick attempt to feed the chicken
  tryToFeedChicken = () => {
    // must have gold
    if(this.props.gold >= chickenConstants.FEED_PRICE) {
      // feed chicken
      this.props.feedChicken(this.props.chicken.id, this.props.time);
      // spend gold
      this.props.spendGold(chickenConstants.FEED_PRICE);
    }
  }

  render() {
    let chicken = this.props.chicken;
    let time = this.props.time;
    chicken.age = this.props.time - chicken.born;

    let sprite = 'liveChicken';
    if(chicken.lastHungry) sprite = 'hungryChicken';
    if(chicken.age < 72) sprite = 'chick';

    return (
      <div
        className="chickenandeggs"
      >
        <div
          className={classNames('Chicken', {'hungry': chicken.lastHungry})}
          onClick={chicken.lastHungry ? this.tryToFeedChicken : null}
        >
          <Sprite
            sheet={sprite}
            alternator={time % 2}
          />
          {chicken.lastHungry ? <div className="hunger"><Sprite sheet={chicken.favoriteFood} /></div> : null}
        </div>
        <EggTrain chicken={chicken.id} />
        <div className="details">{chicken.name}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chicken);