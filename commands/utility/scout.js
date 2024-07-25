const { SlashCommandBuilder } = require('discord.js');
const world = require('../../classes/World.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scout')
		.setDescription('Look for enemies in an area'),
	async execute(interaction) {
    const location = world.locations.find(location => location.id === interaction.channelId);
		await interaction.reply({ content: `There are ${location.monsters.length} monsters nearby. IDs: ${location.monsters.map(monster => monster.id).join(', ')}`, ephemeral: true });
	},
};
