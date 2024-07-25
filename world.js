const LOCATIONS = [
  {
    id: '1264967651164164096',
    name: 'Forest',
    allowedCommands: [
      'join', // Temporary
      'scout',
      'attack',
      'escape',
      'char',
      'use',
    ]
  },
  {
    id: '1264967439033040926',
    name: 'Tavern',
    allowedCommands: [
      'join', // Temporary
      'char',
      'beer',
      'use',
    ]
  },
  {
    id: '1264967630511407177',
    name: 'Market',
    allowedCommands: [
      'join', // Temporary
      'ping',
      'char',
      'shop',
      'use',
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
    this.atk = 7;
    this.xp = 0;
    this.hp = 21;
    this.gold = 10;
    this.location = '1264967651164164096';
    this.inventory = [
      {
        id: 999,
        name: 'Stick',
        type: 'equippable',
        stats: {
          atk: 1
        }
      },
      {
        id: 991,
        name: '(Not) Poisionous mushroom',
        type: 'consumable',
        stats: {
          hp: -25
        }
      }
    ];
  }

  move(newLocation) {
    this.location = newLocation;
  }

  dealDamage() {
    // Deal damage to opponent (first in array)
    return this.atk;
  }

  takeDamage(amount) {
    // Take a set amount of damage
    this.hp = this.hp - amount;
  }

  inventoryToList() {
    return this.inventory.map((item, index) => {
      return `${index} - ${item.name}`;
    }).join('\n');
  }

}

class Shop {
  constructor() {
    this.items = [];
  }
}

class Monster {

  constructor(id) {
    let date = new Date;
    this.id = date.getSeconds();
    this.name = 'Evil Imp';
    this.hp = 10;
    this.atk = 2;
  }

  dealDamage(opponent) {
    // Deal damage to opponent (player)
  }

  takeDamage(amount) {
    // Take a set amount of damage
    this.hp = this.hp - amount;
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
    // console.log('loop ran', new Date);
    const forest = world.locations.find(location => location.name === 'Forest');

    if (forest.monsters.length < 3) {
      let newMonster = new Monster(forest.monsters.length + 1);
      forest.monsters.push(newMonster);
    };

    // console.log(forest.monsters);
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
