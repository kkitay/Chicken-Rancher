// js
import React from 'react';
import ReactDOM from 'react-dom';
import PrettyAge from './scripts/pretty-age';
import ShortID from 'shortid';
import Sprites from './scripts/sprites';

// css
import './styles/index.css';

// components
import Chicken from './components/chicken';

var INCUBATION_TIME = 30;

class Ranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 1,
      gold: 50,
      chickens: [],
      incubator: {
        egg: false,
        timer: INCUBATION_TIME,
      },
    }
  }

  // CREATE A NEW CHICKEN
  spawnChicken = (adult = false, returnObject = false) => {
    function generateChicken() {
      let names = ['Henny', 'Penny', 'Dorothy', 'Henrietta', 'Plucky', 'Goldie', 'Matilda','Anastasia','Annie','Arabella','Beatrice','Betsy','Edna','Charlotte','Daphne','Dottie','Estelle','Eloise','Felicity','Florence','Francis','Genevieve','Georgia','Geraldine','Gladys','Gloria','Harriet','Holly','Iris','June','Loretta','Mabel','Maude','Minnie','Matilda','Myrtle','Opal','Pearl','Penelope','Polly','Stella','Sadie','Tillie'];
      return {
        id: ShortID.generate(),
        name: names[Math.floor((Math.random()*names.length))],
        age: (adult === true ? (24 * 3) : 0),
        hunger: null,
        dead: false,
        eggs: {},
      };
    }

    function addChicken(chickens) {
      let newChickens = chickens.slice();
      let chicken = generateChicken();
      newChickens.push(chicken);
      return newChickens;
    }

    if(returnObject === true) {
      return generateChicken();
    }

    this.setState(state => ({
      chickens: addChicken(state.chickens)
    }));
  }

  // RESET CHICKEN HUNGER, DECREMENT GOLD
  feedChicken = (id) => {
    let price = 10;
    if(this.state.gold < price) return;

    function removeHunger(chickens, id) {
      let theChickens = chickens.map(c => c.id === id
        ? Object.assign(c, {hunger: null})
        : c
      );
      return theChickens;
    }

    this.setState(state => ({
      gold: this.spendMoney(state.gold, price),
      chickens: removeHunger(state.chickens, id)
    }));
  }

  // REMOVE EGG, INCREMENT GOLD
  sellEgg = (id, egg) => {
    console.log(`Selling ${id}'s egg ${egg.id} for ${egg.value}`);

    this.setState(state => ({
      gold: state.gold + egg.value,
      chickens: this.removeEgg(state.chickens, id, egg.id)
    }));
  }

  // DRAG & DROP AN EGG TO INCUBATE
  onEggDragOver = (e) => {
    e.preventDefault();
  }

  onEggDrop = (e) => {
    let chickenID = e.dataTransfer.getData('chicken');
    let eggID = e.dataTransfer.getData('egg');

    if(this.state.incubator.egg === true) {
      return;
    }

    this.setState(state => ({
      incubator: {
        egg: true,
        timer: INCUBATION_TIME,
      },
      chickens: this.removeEgg(state.chickens, chickenID, eggID),
    }));
  }
  
  // REMOVE AN EGG
  removeEgg(chickens, cid, eid) {
    let theChickens = chickens.map(c => {
      if(c.id !== cid) return c;
      let newChicken = Object.assign({}, c);
      delete newChicken.eggs[eid];
      return newChicken;
    });
    return theChickens;
  }

  // SPEND X AMOUNT OF GOLD
  spendMoney(money, price) {
    if(money >= price) return money - price;
    return money;
  }

  // HOUR CYCLE (main game time advance function)
  hourCycle = () => {
    // update chicken
    const updateChickens = (chickens, incubator) => {
      let newChickens = [];
      for(let chicken of chickens) {
        // skip dead chickens.
        if(chicken.dead === true) {
          newChickens.push(chicken);
          continue;
        }

        // increment age
        chicken.age++;

        // none of the rest for the young'ns!
        if(chicken.age < (24 * 3)) {
          newChickens.push(chicken);
          continue;
        }

        // chance to lay an egg
        if(chicken.hunger === null && Math.random() <= 0.025 && Object.keys(chicken.eggs).length < 3) {
          let id = ShortID.generate();
          chicken.eggs[id] = {
            id: id,
            value: 10,
            hatchable: (Math.random() < 0.25 ? true : false),
          }
        }

        if(chicken.hunger !== null) {
          // deplete hunger
          chicken.hunger--;
          // chicken dies :(
          if(chicken.hunger === 0) chicken.dead = true;
        }else {
          // chance to get hungry
          chicken.hunger = Math.random() <= 0.02
            ? 30
            : null;
        }
        newChickens.push(chicken);
      }
      if(incubator.egg && incubator.timer === 0) {
        newChickens.push(this.spawnChicken(false, true));
      }
      return newChickens;
    }

    const incubate = (incubator) => {
      if(!incubator.egg) return incubator;
      if(incubator.timer === 0) {
        return {
          egg: null,
          timer: INCUBATION_TIME,
        }
      } else {
        return Object.assign({timer: incubator.timer--}, incubator)
      }
    }

    this.setState(state => ({
      // increment hours
      hours: state.hours + 1,
      // add age to chickens
      chickens: updateChickens(state.chickens, state.incubator),
      // incubate
      incubator: incubate(state.incubator),
    }));
  }

  // MOUNT RANCH
  componentDidMount = () => {
    // create a new chicken
    for(let i = 0; i < 3; i++) {
      this.spawnChicken(true);
    }
    
    // begin hour cycle timer
    this.cycleTimer = setInterval(
      () => this.hourCycle(),
      500
    );
  }

  // UNMOUNT RANCH
  componentWillUnmount = () => {
    clearInterval(this.cycleTimer);
  }

  render() {
    var liveChickens = this.state.chickens.filter(c => !c.dead).length;

    return (
      <div className="ranch">
        <div className="header">
          <h1>
            You have {this.state.gold}G.
            {liveChickens < 15
            ? <span>You are {liveChickens}/15 chickens from being a great chicken rancher.</span>
            : <span>You are a great chicken rancher! Congratulations!</span>
            }
            </h1>
          <div id="daycounter">{PrettyAge(this.state.hours, true)}</div>
        </div>
        <div className="coop">
          {this.state.chickens.filter(c => !c.dead).map(chicken => 
          <Chicken
            id={chicken.id}
            incubatorHasEgg={this.state.incubator.egg}
            key={chicken.id}
            name={chicken.name}
            age={chicken.age}
            hunger={chicken.hunger}
            dead={chicken.dead}
            handleChickenClick={this.feedChicken.bind(this, chicken.id)}
            handleEggClick={this.sellEgg.bind(this, chicken.id)}
            eggs={chicken.eggs}
          />)}
          {liveChickens > 0
          ? <div className="incubator">
              <div
                className={!this.state.incubator.egg ? 'droppable' : ''}
                onDragOver={e => this.onEggDragOver(e)}
                onDrop={e => this.onEggDrop(e)}
              >
                {this.state.incubator.egg ? <div className="incubatedegg">{Sprites.makeSprite(null, Sprites.sprites.egg)}</div> : ''}
                {Sprites.makeSprite(null, Sprites.sprites.incubator)}
              </div>
              <div className="details">Incubator</div>
            </div>
          : <div className="gameover">Game Over</div>
          }
        </div>
        <div className="graveyard">
          {this.state.chickens.filter(c => c.dead).map(chicken => 
            <p key={chicken.id}>{chicken.name} is dead</p>
          )}
        </div>  
        <div id="credit">
          by <a href="https://twitter.com/kkitay" target="_blank" rel="noopener noreferrer">@kkitay</a>
          <div className="secret">
            <button onClick={this.spawnChicken}>Spawn Chicken</button>
            <button onClick={this.componentWillUnmount}>Stop Timer</button>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Ranch />,
  document.getElementById('root')
);