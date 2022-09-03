const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("croxydb");
module.exports = {
  name: "loop",
  description: "Bật hoặc tắt chế độ vòng lặp âm nhạc.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {

    const queue = client.player.getQueue(interaction.guild.id);
    let cmds = db.get("loop." + interaction.user.id + interaction.guild.id + interaction.channel.id)
    if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })
    if (cmds) return interaction.reply({ content: `Bạn đã có một lệnh hoạt động ở đây. ❌\nhttps://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${cmds}`, ephemeral: true }).catch(e => { })

    let button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Loop")
        .setStyle(ButtonStyle.Success)
        .setCustomId("loop"))

    const embed = new EmbedBuilder()
      .setColor("007fff")
      .setTitle('Loop System')
      .setDescription(`**${queue.current.title}** hiện đang lặp lại.`)
      .setTimestamp()
      .setFooter({ text: `DeepCraftVn` })
    interaction.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {
      await db.set("loop." + interaction.user.id + interaction.guild.id + interaction.channel.id, Message.id)
      const filter = i => i.user.id === interaction.user.id
      let col = await interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

      col.on('collect', async (button) => {
        if (button.user.id !== interaction.user.id) return

        switch (button.customId) {
          case 'loop':
            if (queue.repeatMode === 1) return interaction.reply({ content: `Trước tiên, bạn nên tắt chế độ lặp của nhạc hiện có **(/loop)** ❌`, ephemeral: true }).catch(e => { })
            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            interaction.editReply({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**,Toàn bộ chuỗi sẽ lặp lại không ngừng 🔁` : `Đã xảy ra lỗi. ❌` }).catch(e => { })
            await button.deferUpdate();
            break
        }
      })
      col.on('end', async (button) => {
        await db.delete("loop." + interaction.user.id + interaction.guild.id + interaction.channel.id)
        button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel("Loop It")
            .setCustomId("loop")
            .setDisabled(true))

        const embed = new EmbedBuilder()
          .setColor("007fff")
          .setTitle('Loop System - Ended')
          .setDescription(`Your time is up to choose.`)
          .setTimestamp()
          .setFooter({ text: `DeepCraftVn` })

        await interaction.editReply({ embeds: [embed], components: [button] }).catch(e => { });
      })
    }).catch(e => { })
  }
}
