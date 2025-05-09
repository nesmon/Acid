const { REST, Routes } = require('discord.js');
const AcidConfig = require('./config');

const rest = new REST({ version: '10' }).setToken(AcidConfig.discord.token);

(async () => {
  try {
    console.log('Deleting all global slash commands...');
    await rest.put(Routes.applicationCommands(AcidConfig.discord.clientId), { body: [] });
    console.log('✅ All global slash commands deleted.');
  } catch (error) {
    console.error('❌ Error deleting commands:', error);
  }
})();