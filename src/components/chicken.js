import React from 'react';
import '../styles/chicken.css';
import PrettyAge from '../scripts/pretty-age';
import Sprites from '../scripts/sprites';

export default class Chicken extends React.Component {
  render() {
    let sprite = null;
    if(this.props.age > 12) {
      sprite = Sprites.makeSprite(null, Sprites.sprites.sleepyChicken);
    } else {
      sprite = Sprites.makeSprite(this.props.age, Sprites.sprites.liveChicken);
    }

    return (
      <div className="chicken">
        {sprite}
        <p>{this.props.name}</p>
        <p>{PrettyAge(this.props.age)}</p>
      </div>
    );
  }
}