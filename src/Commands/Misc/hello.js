const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("What did you expect?"),

  async execute(interaction) {
    await interaction.reply({
      content: "Hello there! 👋",
    });  
  }
};