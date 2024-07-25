const { Location, LOCATIONS } = require('./Location.js');
const Monster = require('./Monster.js');
const Player = require('./Player.js');
const Shop = require('./Shop.js');

class World {
  constructor(locations) {
    this.players = [];
    this.shop = new Shop();
    this.locations = locations.map(({id, name, allowedCommands}) => {
      return new Location(id, name, allowedCommands);
    });

    // Start the game loop
    setInterval(() => {
      this.loop(this);
    }, 5000);
  }

  loop(world) {
    const forest = world.locations.find(location => location.name === 'Forest');

    if (forest.monsters.length < 3) {
      let newMonster = new Monster(forest.monsters.length + 1);
      forest.monsters.push(newMonster);
    };
  }

  addPlayer(id) {
    const playerExists = this.players.find((player) => player.id === id );

    if (playerExists) {
      throw new Error('User already exists!');
    }

    const newPlayer = new Player(id);
    this.players = [...this.players, newPlayer];

    return newPlayer;
  }

  getPlayersInLocation(locationId) {
    return this.players.filter(player => {
      player.location = locationId;
    });
  }
}

module.exports = new World(LOCATIONS);
