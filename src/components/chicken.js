import React from 'react';
import '../styles/chicken.css';
//import PrettyAge from '../scripts/pretty-age';
import Sprites from '../scripts/sprites';

export default class Chicken extends React.Component {
  constructor(props) {
    super(props);
    let foods = [Sprites.sprites.corn, Sprites.sprites.carrot, Sprites.sprites.eggplant, Sprites.sprites.turnip];
    this.state = {
      favoriteFood: foods[Math.floor(Math.random() * foods.length)]
    }
  }

  onEggDragStart(e, chicken, egg) {
    e.dataTransfer.setData('chicken', chicken.id);
    e.dataTransfer.setData('egg', egg.id);
  }

  render() {
    let sprite = null;
    if(this.props.hunger) {
      sprite = Sprites.makeSprite(this.props.age, Sprites.sprites.sleepyChicken);
    } else if(this.props.age < (24 * 3)) {
      sprite = Sprites.makeSprite(this.props.age, Sprites.sprites.chick);
    } else {
      sprite = Sprites.makeSprite(this.props.age, Sprites.sprites.liveChicken);
    }

    // <p className="deet">{PrettyAge(this.props.age)} old</p>
    let chickenClass = ["chicken"];
    if(this.props.hunger > 0) chickenClass.push('hungry');

    return (
      <div className="chickenandeggs">
        <div
        className={chickenClass.reduce((c, v) => c += v + ' ', '')}
        onClick={this.props.hunger !== null ? this.props.handleChickenClick : null}
        >
          {sprite}
          {this.props.hunger !== null
            ? <div className="hunger">
                {Sprites.makeSprite(null, this.state.favoriteFood)}
              </div>
            : null}
        </div>
        <div className="eggs">
          {Object.keys(this.props.eggs).map(key => (
              <div
                key={this.props.eggs[key].id}
                draggable={this.props.eggs[key].hatchable ? true : false}
                onDragStart={e => this.onEggDragStart(e, this.props, this.props.eggs[key])}
                className={'egg'
                  + (this.props.eggs[key].hatchable ? ' hatchable' : '')
                  + (this.props.dragged ? ' dragged' : '')
                }
                onClick={this.props.handleEggClick.bind(this, this.props.eggs[key])}
              >
                {Sprites.makeSprite(null, Sprites.sprites.egg)}
              </div>
            ))}
        </div>
        <div className="details">
          {this.props.name}
        </div>
      </div>
    );
  }
}