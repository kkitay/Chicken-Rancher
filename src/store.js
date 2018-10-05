import { createStore, combineReducers } from 'redux';
import ranch from './reducers/ranch';
import chickens from './reducers/chickens';
import eggs from './reducers/eggs';

const reducers = combineReducers({
  ranch,
  chickens,
  eggs
});

export default createStore(reducers);