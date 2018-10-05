import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Sprite from '../common/Sprite';
import {removeEgg} from '../actions/egg';
import {addGold} from '../actions/ranch';
import {eggConstants} from '../constants';
import './Egg.css';

const mapDispatchToProps = dispatch => {
  return {
    removeEgg: id => dispatch(removeEgg(id)),
    addGold: amount => dispatch(addGold(amount)),
  }
}

const mapStateToProps = (state, props) => {
  return {
    time: state.ranch.time,
    egg: state.eggs[props.id]
  }
}

class Egg extends React.Component {
  dragEgg(e, egg) {
    e.dataTransfer.setData('egg', JSON.stringify(egg));
  }

  sellEgg = () => {
    this.props.removeEgg(this.props.egg.id);
    this.props.addGold(eggConstants.DEFAULT_GOLD_VALUE);
  }

  render() {
    let egg = this.props.egg;

    return (
      <div
        draggable={egg.hatchable}
        onDragStart={e => this.dragEgg(e, egg)}
        className={classNames('Egg', {'hatchable': egg.hatchable})}
        onClick={this.sellEgg}
      >
        <Sprite sheet="egg" alternator={this.props.time} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Egg);