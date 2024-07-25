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
    this.level = 1;
    this.atk = 10;
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

class Monster {
  constructor(id) {
    this.id = id;
    this.name = 'Evil Imp';
    this.hp = 10;
    this.atk = 2;
  }

  dealDamage(opponent) {
    // Deal damage to opponent (player)
  }

  takeDamage(amount) {
    // Take a set amount of damage
  }
}

class World {
  constructor() {
    this.players = [];
    this.shop = new Shop();
    this.locations = LOCATIONS.map(({id, name, allowedCommands}) => {
      return new Location(id, name, allowedCommands);
    });

    // Start the game loop
    setInterval(() => {
      this.loop(this);
    }, 5000);
  }

  loop(world) {
    const forest = world.locations.find(location => location.name === 'Forest');

    forest.monsters.forEach((monster, index) => {
      if (monster.hp <= 0) {
        forest.monsters.splice(index, 1);
      }
    });

    if (forest.monsters.length < 3) {
      let newMonster = new Monster(forest.monsters.length + 1);
      forest.monsters.push(newMonster);
    };

    console.log(world.locations[0].monsters);
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
