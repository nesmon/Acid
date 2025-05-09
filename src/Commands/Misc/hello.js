const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("What did you expect?"),

  async execute(interaction) {
    try {
      await interaction.reply({ content: "Ping..." });

      const reply = await interaction.fetchReply();
      const latency = reply.createdTimestamp - interaction.createdTimestamp;
      const apiPing = interaction.client.ws.ping;

      await interaction.editReply({
        content: `🏓 Pong! Latency: ${latency}ms | API Ping: ${apiPing}ms`
      });

    } catch (error) {
      console.error("❌ Failed to execute /hello command:", error);

      // Try to reply or edit, depending on whether a response was already sent
      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({
          content: "An error occurred while executing this command.",
        });
      } else {
        await interaction.reply({
          content: "An error occurred while executing this command.",
          ephemeral: true
        });
      }
    }
  }
};