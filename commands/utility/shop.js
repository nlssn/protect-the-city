const { SlashCommandBuilder } = require('discord.js');
const world = require('../../world.js');

const shop = [
  { id: 0,
    name: 'Sword',
    price: 10,
    type: 'equippable',
    equipped: false,
    stats: {
      atk: 5,
    }
  },
  { id: 1,
    name: 'Shield',
    price: 7,
    type: 'equippable',
    equipped: false,
    stats: {
      hp: 5,
    }
  },
  { id: 2,
    name: 'Potion',
    price: 5,
    type: 'consumable',
    stats: {
      hp: 5,
    }
  }
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Buy something from the market')
    .addStringOption(option =>
      option.setName('buy')
        .setDescription('Which item would you like?')
        .addChoices(shop.map((item) => {
          return { name: item.name, value: item.id.toString() };
        }))
			),
	async execute(interaction) {
    const pickedItem = interaction.options.getString('buy');

    const player = world.players.find(player => player.id === interaction.user.id);

    let reply = `Shoppedoppe`;

    if (player.gold >= shop[pickedItem].price) {
      player.gold -= shop[pickedItem].price;
      player.inventory.push(shop[pickedItem]);
      reply = `You give the shady dealer their money, and recieve your new thingy\nGold: -${shop[pickedItem].price} | Inventory: + 1x${shop[pickedItem].name}`;
    }
    else {
      reply = `You can't afford this item`;
    }

    await interaction.reply(reply);
	},
};
