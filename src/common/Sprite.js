import React from 'react';
import './Sprite.css';
import classNames from 'classnames';
import sprites from './spriteSheet';

const Sprite = props => {
  let sprite = sprites[props.sheet];

  // check sprite
  if(!sprite) {
    return console.error('Sprite failed', `${sprite} could not be found`);
  }

  let displaySprite = props.alternator && sprite[1] ? sprite[1] : sprite[0];

  return (
    <div className={classNames('Sprite', props.sheet)}>
      {displaySprite.map((pixel, index) => {
        let style = {}
        style.background = (pixel.r || pixel.g || pixel.b)
          ? `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
          : 'none';
        return (
          <div
            key={index}
            className="pixel"
            style={style}
          />
        );
      })}
    </div>
  );
}

export default Sprite;

/*

exports.makeSprite = function(oddEven = null, sprites) {
    let displaySprite = sprites[0];
    if(sprites[1] && oddEven && oddEven % 2 !== 0) {
      displaySprite = sprites[1];
    }
  
    return (
      <div className="sprite">
        {Array.from(displaySprite).map((pixel, index) => {
          let style = {};
          if(pixel.r || pixel.g || pixel.b) {
            style.background = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
          } else {
            style.background = 'none';
          }
          return (
            <div
              key={index}
              className="pixel"
              style={style}
            />
          );
        })}
      </div>
    );
}

export default exports;
*/