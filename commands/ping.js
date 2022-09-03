const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "ping",
    description: "Nó giúp bạn có được thông tin về tốc độ của bot.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const start = Date.now();
        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Pong!")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `Ping tin nhắn`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `Độ trễ tin nhắn`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `Độ trễ API`, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
            ])
            .setTimestamp()
            .setFooter({ text: `DeepCraftVn` })
        interaction.reply({ embeds: [embed] }).catch(e => { });

    },
};
