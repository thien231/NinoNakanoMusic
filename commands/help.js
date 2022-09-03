const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "help",
    description: "Nó giúp bạn lấy thông tin về bot và các lệnh.",
    permissions: "0x0000000000000800",
    options: [],
    showHelp: false,
    run: async (client, interaction) => {

        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Đã đến lúc nghe nhạc trên máy chủ bất hòa của bạn với giao diện hoàn toàn miễn phí và nâng cao. Bot âm nhạc hỗ trợ chơi nhạc trên nhiều nền tảng sẽ làm cho máy chủ của bạn cảm thấy đặc biệt.")
            .addFields([
                { name: `Lệnh Bot`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
            ])
            .setTimestamp()
            .setFooter({ text: `DeepCraftVn` })
        interaction.reply({ embeds: [embed] }).catch(e => { })
    },
};
