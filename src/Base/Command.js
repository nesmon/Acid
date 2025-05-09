class Command {
    constructor(client, {
      name = null,
      description = 'No description provided.',
      category = 'Miscellaneous',
      nsfw = false,
      enabled = true,
      guildOnly = false,
      slash = false,
      options = []
    }) {
      this.client = client;
      this.conf = { nsfw, enabled, guildOnly };
      this.help = { name, description, category, nsfw };
      this.name = name;
      this.slash = slash;
      this.options = options;
    }
  }
  
  module.exports = Command;