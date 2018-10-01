// js
import React from 'react';
import ReactDOM from 'react-dom';
import PrettyAge from './scripts/pretty-age';

// css
import './styles/index.css';

// components
import Chicken from './components/chicken';

class Ranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 1,
      chickens: [],
    }
  }

  spawnChicken = () => {
    function addChicken(chickens) {
      let newChickens = chickens.slice();
      let names = ['Henny', 'Penny', 'Dorothy', 'Henrietta', 'Plucky', 'Goldie'];
      let chicken = {
        name: names[Math.floor((Math.random()*names.length))],
        age: 0,
      };
      newChickens.push(chicken);
      return newChickens;
    }

    this.setState(state => ({
      chickens: addChicken(state.chickens)
    }));
  }

  // HOUR CYCLE (main game time advance function)
  hourCycle() {
    function updateChickens(chickens) {
      let newChickens = [];
      for(let chicken of chickens) {
        chicken['age']++;
        newChickens.push(chicken);
      }
      return newChickens;
    }

    this.setState(state => ({
      // increment hours
      hours: state.hours + 1,
      // add age to chickens
      chickens: updateChickens(state.chickens),
    }));
  }

  // MOUNT RANCH
  componentDidMount() {
    // create a new chicken
    this.spawnChicken();
    
    // begin hour cycle timer
    this.cycleTimer = setInterval(
      () => this.hourCycle(),
      1000
    );
  }

  // UNMOUNT RANCH
  componentWillUnmount() {
    clearInterval(this.cycleTimer);
  }

  render() {
    return (
      <div>
        <div id="daycounter">{PrettyAge(this.state.hours, true)}</div>
        <h1>You are a chicken rancher.</h1>
        <p><button onClick={this.spawnChicken}>Spawn Chicken</button></p>
        {this.state.chickens.map((chicken, index) => <Chicken
          key={index}
          name={chicken.name}
          age={chicken.age}     
        />)}
        <div id="credit">by <a href="https://twitter.com/kkitay" target="_blank" rel="noopener noreferrer">@kkitay</a></div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Ranch />,
  document.getElementById('root')
);