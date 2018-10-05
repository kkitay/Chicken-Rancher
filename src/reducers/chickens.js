import {chickenConstants, actionTypes} from '../constants';

const generateChicken = (id, born, roll1 = Math.random(), roll2 = Math.random(), roll3 = Math.random()) => {
  let names = ['Henny', 'Penny', 'Dorothy', 'Henrietta', 'Plucky', 'Goldie', 'Matilda','Anastasia','Annie','Arabella','Beatrice','Betsy','Edna','Charlotte','Daphne','Dottie','Estelle','Eloise','Felicity','Florence','Francis','Genevieve','Georgia','Geraldine','Gladys','Gloria','Harriet','Holly','Iris','June','Loretta','Mabel','Maude','Minnie','Matilda','Myrtle','Opal','Pearl','Penelope','Polly','Stella','Sadie','Tillie'];
  let foods = ['corn','carrot','eggplant','turnip'];
  let returnObj = {};
  returnObj[id] = {
    id: id,
    born,
    name: names[Math.floor((roll1*names.length))],
    favoriteFood: foods[Math.floor(roll2 * foods.length)],
    lastHungry: null,
    dead: false,
  };
  return returnObj;
}

const initialState = {
  ...generateChicken(1, (-1 * chickenConstants.YOUNG_AGE)),
  ...generateChicken(2, (-1 * chickenConstants.YOUNG_AGE)),
  ...generateChicken(3, (-1 * chickenConstants.YOUNG_AGE)),
}

const chickenReducer = (state = initialState, action) => {
  // FEED CHICKEN
  if(action.type === actionTypes.chicken.FEED_CHICKEN) {
    let id = action.chicken;
    let chicken = state[id];
    chicken.lastHungry = null;
    return { ...state, [id]: chicken };
  }
  // MAKE HUNGRY
  if(action.type === actionTypes.chicken.MAKE_HUNGRY) {
    let id = action.chicken;
    let chicken = state[id];
    chicken.lastHungry = action.timestamp;
    return { ...state, [id]: chicken };
  }
  // KILL CHICKEN
  if(action.type === actionTypes.chicken.KILL_CHICKEN) {
    let id = action.chicken;
    let chicken = state[id];
    chicken.dead = true;
    return { ...state, [id]: chicken };
  }
  // HATCH CHICKEN
  if(action.type === actionTypes.chicken.HATCH_CHICKEN) {
    let newChicken = generateChicken(action.id, action.timestamp, action.roll1, action.roll2, action.roll3);
    return { ...state, ...newChicken };
  }
  return state;
}

export default chickenReducer;