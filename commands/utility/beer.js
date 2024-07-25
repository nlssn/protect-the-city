const { SlashCommandBuilder } = require('discord.js');
const world = require('../../classes/World.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beer')
		.setDescription('Buy a wheat based healing potion - 5KR'),
	async execute(interaction) {
    const player = world.players.find(player => player.id === interaction.user.id);

    player.gold -= 5;
    player.hp += 2
    await interaction.reply(`You hand the bar keep a fiver. You chug the golden liquid and feel much stronger! :beer:\nHP: +2 | Gold: -5`);
	},
};
