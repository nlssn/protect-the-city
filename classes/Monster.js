module.exports = class Monster {

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
};
