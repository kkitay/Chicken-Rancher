import {actionTypes} from '../constants';

export const addTime = (amount = 1) => ({
  type: actionTypes.ranch.ADD_TIME,
  amount: amount 
});

export const addGold = (amount) => ({
  type: actionTypes.ranch.ADD_GOLD,
  amount: amount
});

export const spendGold = (amount) => ({
  type: actionTypes.ranch.SPEND_GOLD,
  amount: amount
});