import React from 'react';
import {connect} from 'react-redux';
import './EggTrain.css';
import Egg from './Egg';

const mapStateToProps = (state) => {
  return {
    eggs: state.eggs
  }
}

const EggTrain = ({eggs, chicken}) => {
  let justThisChickensEggs = Object.values(eggs).filter(c => c.chicken === chicken);

  return (
    <div
      className="EggTrain"
    >
      {justThisChickensEggs.map(egg => <Egg key={egg.id} id={egg.id} />)}
    </div>
  );
}

export default connect(mapStateToProps)(EggTrain);