const { ApplicationCommandOptionType } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
module.exports = {
    name: "volume",
    description: "Cho phép bạn điều chỉnh âm lượng nhạc.",
    permissions: "0x0000000000000800",
    options: [{
        name: 'volume',
        description: 'Nhập số để điều chỉnh âm lượng.',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })

        const vol = parseInt(interaction.options.getInteger('volume'));

        if (!vol) return interaction.reply({ content: `Khối lượng hiện tại: **${queue.volume}** 🔊\n**Để thay đổi âm lượng, với \`1\` to \`${maxVol}\` Nhập một số ở giữa.**`, ephemeral: true }).catch(e => { })

        if (queue.volume === vol) return interaction.reply({ content: `Âm lượng bạn muốn thay đổi đã là âm lượng hiện tại ❌`, ephemeral: true }).catch(e => { })

        if (vol < 0 || vol > maxVol) return interaction.reply({ content: `**Nhập một số từ \`1\` to \`${maxVol}\` để thay đổi âm lượng .** ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setVolume(vol);

        return interaction.reply({ content: success ? `Âm lượng đã thay đổi:**${vol}**/**${maxVol}** 🔊` : `Đã xảy ra lỗi. ❌` }).catch(e => { })
    },
};
