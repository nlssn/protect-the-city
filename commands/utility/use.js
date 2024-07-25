const { SlashCommandBuilder } = require('discord.js');
const world = require('../../world.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('use')
		.setDescription('Use items or consumables')
    .addIntegerOption(option =>
      option.setName('item')
        .setDescription('Which item to use?')),
	async execute(interaction) {
    const player = world.players.find(player => player.id === interaction.user.id);
    const selectedItem = interaction.options.getInteger('item');

    if (selectedItem >= 0 && selectedItem !== null) {
      let item = player.inventory[selectedItem];

      let response = 'You do it';

      switch (item.type) {
        case 'consumable':
          response = `You consume the ${item.name}`;
          player.inventory.splice(selectedItem, 1);

          for (let [key, val] of Object.entries(item.stats)) {
            player[key] = player[key] + val <= 0 ? 1 : player[key] + val;
          }
          break;
        case 'equippable':

          if (!item.equipped) {
            response = `You equip the ${item.name}`;

            for (let [key, val] of Object.entries(item.stats)) {
              player[key] += val;
            }

          } else {
            response = `You unequip the ${item.name}`;

            for (let [key, val] of Object.entries(item.stats)) {
              player[key] -= val;
            }
          }

          item.equipped = !item.equipped;
          break;
      }

      await interaction.reply(response);

    } else {
      await interaction.reply(`Select an item from your inventory:\n${player.inventoryToList()}`);
    }
	},
};
