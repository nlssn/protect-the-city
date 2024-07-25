const LOCATIONS = [
  {
    id: '1264967651164164096',
    name: 'Forest',
    allowedCommands: []
  },
  {
    id: '1264967439033040926',
    name: 'Tavern',
    allowedCommands: []
  },
  {
    id: '1264967630511407177',
    name: 'Market',
    allowedCommands: [
      'ping'
    ]
  }
];

class Location {
  constructor(id, name, allowedCommands) {
    this.id = id;
    this.name = name;
    this.players = [];
    this.monsters = [];
    this.allowedCommands = allowedCommands;
  }
}

class Player {
  constructor(id) {
    this.id = id;
    this.xp = 0;
    this.hp = 100;
    this.gold = 10;
    this.location = '1264967651164164096';
    this.inventory = ['stick'];
  }

  move(newLocation) {
    this.location = newLocation;
  }
}

class Shop {
  constructor() {
    this.items = [];
  }
}

class World {
  constructor() {
    this.players = [];
    this.shop = new Shop();
    this.locations = LOCATIONS.map(({id, name, allowedCommands}) => {
      return new Location(id, name, allowedCommands);
    });
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

module.exports = new World;
