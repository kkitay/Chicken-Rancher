import ShortID from 'shortid';
import {actionTypes} from '../constants';

export const layEgg = (chicken) => ({
  type: actionTypes.egg.LAY_EGG,
  chicken,
  id: ShortID.generate(),
  roll1: Math.random(),
});

export const removeEgg = (id) => ({
  type: actionTypes.egg.REMOVE_EGG,
  id,
});

export const incubateEgg = (egg) => ({
  type: actionTypes.egg.INCUBATE_EGG,
  egg,
});