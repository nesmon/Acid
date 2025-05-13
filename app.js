const { Client, GatewayIntentBits, Collection, Events, REST, Routes } = require('discord.js');
const { readdir } = require('fs').promises;
const path = require('node:path');
const AcidConfig = require('./config');

class AcidCore extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
            ]
        });

        this.commands = new Collection();

        this._addEventListeners();
        this.loadCommands();

        this.login(AcidConfig.discord.token);
    }

    async _addEventListeners() {
        const eventFiles = await readdir("./src/Events/");
        console.log(`Loading ${eventFiles.length} events.`);
        eventFiles.forEach(file => {
            const filePath = path.join(__dirname, "src/Events", file);
            const event = require(filePath);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        });
    }

    async loadCommands(dir = './src/Commands') {
        const entries = await readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                await this.loadCommands(fullPath);
            } else if (entry.name.endsWith('.js')) {
                const command = require(path.resolve(fullPath));
                if ('data' in command && 'execute' in command) {
                    this.commands.set(command.data.name, command);
                    console.log(`✅ Slash command loaded: ${command.data.name}`);
                } else {
                    console.warn(`⚠️ The command ${entry.name} is invalid (missing 'data' or 'execute').`);
                }
            }
        }
    }

    async _loadCommand(commandPath) {
        try {
            const command = require(commandPath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
                console.log(`✅ Command loaded: ${command.data.name}`);
            } else {
                console.warn(`⚠️ The file ${commandPath} is invalid.`);
            }
        } catch (error) {
            console.error(`❌ Error loading the command ${commandPath}:`, error);
        }
    }

    async _unloadCommand(commandName) {
        if (!this.commands.has(commandName)) {
            console.warn(`⚠️ The command ${commandName} is not loaded.`);
            return;
        }

        const command = this.commands.get(commandName);
        delete require.cache[require.resolve(`./src/Commands/${commandName}.js`)];
        this.commands.delete(commandName);
        console.log(`✅ Command unloaded: ${commandName}`);
    }

    async _reloadCommand(commandName) {
        const commandPath = path.join(__dirname, 'src/Commands', commandName);
        try {
            await this._unloadCommand(commandName);
            await this._loadCommand(commandPath);
            console.log(`✅ Command ${commandName} reloaded.`);
        } catch (error) {
            console.error(`❌ Error reloading command ${commandName}:`, error);
        }
    }
}

new AcidCore();