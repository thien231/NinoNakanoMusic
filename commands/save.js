const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "save",
    description: "Nó gửi và lưu nhạc đã chơi cho bạn qua hộp dm.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: ` Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Lưu bản nhạc")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `Track`, value: `\`${queue.current.title}\`` },
                { name: `Duration`, value: `\`${queue.current.duration}\`` },
                { name: `URL`, value: `${queue.current.url}` },
                { name: `Saved Server`, value: `\`${interaction.guild.name}\`` },
                { name: `Requested By`, value: `${queue.current.requestedBy}` }
            ])
            .setTimestamp()
            .setFooter({ text: `DeepCraftVn` })
        interaction.user.send({ embeds: [embed] }).then(() => {
            interaction.reply({ content: `Tôi đã gửi tên của bản nhạc qua tin nhắn riêng. ✅`, ephemeral: true }).catch(e => { })
        }).catch(error => {
            interaction.reply({ content: `Không thể gửi cho bạn tin nhắn riêng tư. ❌`, ephemeral: true }).catch(e => { })
        });
    },
};
