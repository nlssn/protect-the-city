const { SlashCommandBuilder } = require('discord.js');
const world = require('../../world.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('char')
		.setDescription('Information about your character'),
	async execute(interaction) {
    const player = world.players.find(player => player.id === interaction.user.id);
    await interaction.reply(`HP: ${player.hp} | XP: ${player.xp} | Gold: ${player.gold}`);
	},
};
