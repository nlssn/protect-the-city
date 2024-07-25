const { SlashCommandBuilder } = require('discord.js');
const world = require('../../world.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Enter the city'),
	async execute(interaction) {

    try {
      const player = world.addPlayer(interaction.user.id);
      await interaction.reply(`Welcome, ${interaction.user.username}.\nHP: ${player.hp} | XP: ${player.xp} | Gold: ${player.gold}`);
    } catch(error) {
      await interaction.reply(error.message);
    }

	},
};
