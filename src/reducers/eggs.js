import {eggConstants, actionTypes} from '../constants';

const generateEgg = (chicken, id, roll1) => {
  let obj = {};
  obj[id] = {
    id,
    chicken,
    value: eggConstants.DEFAULT_GOLD_VALUE,
    hatchable: (roll1 < eggConstants.HATCHABLE_CHANCE)
  }
  return obj;
}

const initialState = {}

const eggReducer = (state = initialState, action) => {
  // lay egg
  if(action.type === actionTypes.egg.LAY_EGG) {
    // add check for chicken's eggs.
    let chickensEggs = Object.values(state).filter(c => c.chicken === action.chicken);
    if(chickensEggs.length < eggConstants.MAX_EGGS_PER_CHICKEN) {
      let egg = generateEgg(action.chicken, action.id, action.roll1);
      return {...state, ...egg };
    }
  }

  // remove egg
  if(action.type === actionTypes.egg.REMOVE_EGG) {
    let newState = Object.assign({}, state);
    delete newState[action.id];
    return newState;
  }

  return state;
}

export default eggReducer;