module.exports = {
    name: "back",
    description: "Phát lại bản nhạc trước đó.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có nhạc nào đang phát! ❌`, ephemeral: true }).catch(e => { })

        if (!queue.previousTracks[1]) return interaction.reply({ content: `Không có bản nhạc nào được phát trước đây ❌`, ephemeral: true }).catch(e => { })

        await queue.back();

        interaction.reply({ content: `Bản nhạc trước đó đã bắt đầu phát... ✅` }).catch(e => { })
    },
};
