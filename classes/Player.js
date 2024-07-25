module.exports = class Player {
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
