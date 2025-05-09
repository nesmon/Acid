const { REST, Routes } = require('discord.js');
const { readdir, stat } = require('fs/promises');
const path = require('node:path');
const AcidConfig = require('./config');

const commands = [];

async function loadCommands(dir = './src/Commands') {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await loadCommands(fullPath); // recurse into subfolders
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      const file = require(path.resolve(fullPath));
      if (file && file.data && typeof file.data.toJSON === 'function') {
        commands.push(file.data.toJSON());
        console.log(`✅ Loaded: ${file.data.name}`);
      } else {
        console.warn(`⚠️ Skipped invalid command file: ${fullPath}`);
      }
    }
  }
}

(async () => {
  await loadCommands();

  const rest = new REST({ version: '10' }).setToken(AcidConfig.discord.token);

  try {
    console.log(`📡 Registering ${commands.length} slash command(s)...`);
    await rest.put(Routes.applicationCommands(AcidConfig.discord.clientId), { body: commands });
    console.log('✅ Slash commands registered globally.');
  } catch (err) {
    console.error('❌ Failed to register commands:', err);
  }
})();