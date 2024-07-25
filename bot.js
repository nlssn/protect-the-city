const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const world = require('./classes/World.js');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log(`Loaded /${command.data.name} command`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {

	// If the interaction is not a chat command, die.
	if (!interaction.isChatInputCommand()) return;

	// If the command is not available, die.
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	// /join is always allowed
	if (interaction.commandName !== 'join') {

		// If the player has not created a character (/join), die.
		let player = world.players.find((player) => player.id === interaction.user.id);
		if (!player) {
			await interaction.reply({ content: `Please do /join first`, ephemeral: true });
			console.error(`Could not find a player with id ${interaction.user.id}`);
			return;
		}

		// Verify that the command is allowed in the channel
		let location = world.locations.find(location => location.id === interaction.channelId);

		if (!location.allowedCommands.includes(interaction.commandName)) {
			await interaction.reply({ content: `You can't do that here!`, ephemeral: true });
			return;
		}

		// Try to move the player to the new location (chat room)
		if (player.location === interaction.channelId) {
			console.error('Player is already in that location');
		} else {
			player.move(interaction.channelId);
		}
		
	}

	// Try to execute the command
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
