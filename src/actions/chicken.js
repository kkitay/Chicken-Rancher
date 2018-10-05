import ShortID from 'shortid';
import {actionTypes} from '../constants';

export const killChicken = (id) => ({
  type: actionTypes.chicken.KILL_CHICKEN,
  chicken: id 
});

export const feedChicken = (id, timestamp) => ({
  type: actionTypes.chicken.FEED_CHICKEN,
  chicken: id,
  timestamp,
});

export const makeHungry = (id, timestamp) => {
  return ({
    type: actionTypes.chicken.MAKE_HUNGRY,
    chicken: id,
    timestamp,
  });
}

export const hatchChicken = (timestamp) => ({
  type: actionTypes.chicken.HATCH_CHICKEN,
  id: ShortID.generate(),
  timestamp,
  roll1: Math.random(),
  roll2: Math.random(),
  roll3: Math.random(),
});