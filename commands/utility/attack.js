const { SlashCommandBuilder } = require('discord.js');
const world = require('../../classes/World.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('Attack an enemy')
		.addIntegerOption(option =>
			option.setName('target')
				.setDescription('Which enemy to attack')),
	async execute(interaction) {
    const location = world.locations.find(location => location.id === interaction.channelId);
		const player = world.players.find(player => player.id === interaction.user.id);
		const target = location.monsters.findIndex(monster => monster.id === interaction.options.getInteger('target'));
		const monster = location.monsters[target];

		if (target == -1) {
			await interaction.reply({ content: `This monster does not exists.`, ephemeral: true });
			return;
		}

		if (monster.hp > 0) {
			monster.takeDamage(player.atk);
		}

		if (monster.hp <= 0) {
			location.monsters.splice(target, 1);
			player.gold += 5 ;
			player.xp += 2;
			await interaction.reply({ content: `You killed monster ${interaction.options.getInteger('target')}, +5 coins!\nHP: ${player.hp} | XP: ${player.xp} | Gold: ${player.gold}`, ephemeral: true });
			return;
		}

		player.takeDamage(monster.atk);
		player.gold = Math.floor(player.gold / 2);

		if (player.hp <= 0) {
			await interaction.reply({ content: `You died! But someone magically restored your health to 10 HP. :sparkles:\n.. for a small fee of half your gold :money_with_wings:`, ephemeral: true });
			player.hp = 10;
			return;
		}

		await interaction.reply({ content: `You attacked monster ${interaction.options.getInteger('target')} and dealt ${player.atk.toString()} damage.\nThe monster hit you and dealt ${monster.atk.toString()} damage.`, ephemeral: true });
	},
};
