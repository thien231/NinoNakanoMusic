const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');
module.exports = {
  name: "search",
  description: "Được sử dụng để tìm kiếm âm nhạc của bạn",
  permissions: "0x0000000000000800",
  options: [{
    name: 'name',
    description: 'Nhập tên nhạc bạn muốn phát.',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {

    const name = interaction.options.getString('name')
    if (!name) return interaction.reply({ content: `Vui lòng nhập tên bài hát hợp lệ. ❌`, ephemeral: true }).catch(e => { })

    const res = await client.player.search(name, {
      requestedBy: interaction.member,
      searchEngine: QueryType.AUTO
    });
    if (!res || !res.tracks.length) return interaction.reply({ content: `Không tìm thấy kết quả tìm kiếm. ❌`, ephemeral: true }).catch(e => { })

    const queue = await client.player.createQueue(interaction.guild, {
      leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
      autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
      metadata: interaction.channel
    });

    const embed = new EmbedBuilder();

    embed.setColor('007fff');
    embed.setTitle(`Nhạc đã tìm kiếm: ${name}`);

    const maxTracks = res.tracks.slice(0, 10);

    embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | \`${track.author}\``).join('\n')}\n\nChoose a song from **1** to **${maxTracks.length}** write send or write **cancel** and cancel selection.⬇️`)

    embed.setTimestamp();
    embed.setFooter({ text: `DeepCraftVn` })

    interaction.reply({ embeds: [embed] }).catch(e => { })

    const collector = interaction.channel.createMessageCollector({
      time: 30000,
      errors: ['time'],
      filter: m => m.author.id === interaction.user.id
    });

    collector.on('collect', async (query) => {
      if (["cancel"].includes(query.content)) {
        embed.setDescription(`Đã hủy tìm kiếm âm nhạc. ✅`)
        await interaction.editReply({ embeds: [embed], ephemeral: true }).catch(e => { })
        return collector.stop();
      }
      const value = parseInt(query.content);

      if (!value || value <= 0 || value > maxTracks.length) return interaction.reply({ content: `Error: select a song **1** to **${maxTracks.length}** and write send or type **cancel** and cancel selection. ❌`, ephemeral: true }).catch(e => { })

      collector.stop();

      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channelId);
      } catch {
        await client.player.deleteQueue(interaction.guild.id);
        return interaction.reply({ content: `Tôi không thể tham gia kênh âm thanh. ❌`, ephemeral: true }).catch(e => { })
      }

      await interaction.reply({ content: `Đang tải cuộc gọi nhạc của bạn. 🎧` }).catch(e => { })

      queue.addTrack(res.tracks[Number(query.content) - 1]);
      if (!queue.playing) await queue.play();

    });

    collector.on('end', (msg, reason) => {
      if (reason === 'time') return interaction.reply({ content: `Đã hết thời gian tìm kiếm bài hát ❌`, ephemeral: true }).catch(e => { })
    });
  },
};
