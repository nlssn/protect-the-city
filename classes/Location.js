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

module.exports = {
  LOCATIONS,
  Location
}
