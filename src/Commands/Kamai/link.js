const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Link your different accounts to your Discord account.")
    .addStringOption((option) =>
      option
        .setName("kamai")
        .setDescription("Your Kamai api key set with submit_score enable.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("maitea")
        .setDescription("Your Maitea api key.")
        .setRequired(false)
    ),

  async execute(interaction) {
    console.log(interaction.options.getString("kamai"));
    console.log(interaction.options.getString("maitea"));
    await interaction.reply({
      content: "Hello there! 👋",
    });  
  }
};