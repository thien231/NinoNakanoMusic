const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "play",
    description: "Nó giúp bạn bắt đầu một bản nhạc mới.",
    permissions: "0x0000000000000800",
    options: [{
        name: 'musics',
        description: 'Nhập tên nhạc bạn muốn phát.',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    voiceChannel: true,
    run: async (client, interaction) => {

        const name = interaction.options.getString('musics')
        if (!name) return interaction.reply({ content: `Viết tên bản nhạc bạn muốn tìm kiếm. ❌`, ephemeral: true }).catch(e => { })

        const res = await client.player.search(name, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return interaction.reply({ content: `Không có kết quả nào được tìm thấy! ❌`, ephemeral: true }).catch(e => { })

        const queue = await client.player.createQueue(interaction.guild, {
            leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
            autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
            metadata: interaction.channel
        });

        try {
            if (!queue.playing) await queue.connect(interaction.member.voice.channelId)
        } catch {
            await client.player.deleteQueue(interaction.guild.id);
            return interaction.reply({ content: `Tôi không thể tham gia kênh âm thanh. ❌`, ephemeral: true }).catch(e => { })
        }

        await interaction.reply({ content: `<@${interaction.member.id}>, Nhạc của bạn đang tải... 🎧` }).catch(e => { })
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play()
    },
};
