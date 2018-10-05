import React from 'react';
import {connect} from 'react-redux';
import './Incubator.css';
import {eggConstants} from '../constants'
import {removeEgg} from '../actions/egg';
import {hatchChicken} from '../actions/chicken';
import Sprite from '../common/Sprite';

const mapDispatchToProps = dispatch => {
  return {
    hatchChicken: (timestamp) => dispatch(hatchChicken(timestamp)),
    removeEgg: id => dispatch(removeEgg(id)),
  }
}

const mapStateToProps = state => {
  return {
    time: state.ranch.time,
  }
}

class Incubator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      egg: null,
    }
  }

  finishIncubating = () => {
    // clear egg
    this.setState({ egg: null });

    // hatch a chicken!
    this.props.hatchChicken(this.props.time);
  }

  eggDragOver = (e) => {
    e.preventDefault();
  }

  eggDrop = (e) => {
    let egg = JSON.parse(e.dataTransfer.getData('egg'));

    // you can't incubate if there's already an egg.
    if(this.state.egg) return;

    // remove egg from chicken.
    this.props.removeEgg(egg.id);

    // set the egg
    this.setState({ egg });

    // set a timer
    setTimeout(this.finishIncubating, eggConstants.INCUBATION_TIME);
  }

  render () {
    return (
      <div className="Incubator">
        <div
          className={!this.state.egg ? 'droppable' : null}
          onDragOver={e => this.eggDragOver(e)}
          onDrop={e => this.eggDrop(e)}
        >
          {this.state.egg ? <Sprite sheet="egg" /> : null}
          <Sprite
            sheet="incubator"
          />
        </div>
        <div className="details">Incubator</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Incubator);