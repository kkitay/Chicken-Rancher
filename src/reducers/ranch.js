import {actionTypes} from '../constants';

const initialState = {
  time: 1,
  gold: 50
}

const ranchReducer = (state = initialState, action) => {
  // ADD TIME
  if(action.type === actionTypes.ranch.ADD_TIME) {
    let newTime = state.time + action.amount;
    return { ...state, time: newTime };
  }

  // ADD GOLD
  if(action.type === actionTypes.ranch.ADD_GOLD) {
    let newGold = state.gold + action.amount;
    return { ...state, gold: newGold };
  }

  // SPEND GOLD
  if(action.type === actionTypes.ranch.SPEND_GOLD) {
    let newGold = state.gold - action.amount;
    return { ...state, gold: newGold };
  }
  
  return state;
};

export default ranchReducer;