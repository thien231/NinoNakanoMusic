module.exports = {
    name: "clear",
    description: "Xóa hàng đợi nhạc.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát. ❌`, ephemeral: true }).catch(e => { })

        if (!queue.tracks[0]) return interaction.reply({ content: `Không có bản nhạc nào trong hàng đợi sau bản nhạc hiện tại ❌`, ephemeral: true }).catch(e => { })

        await queue.clear();

        interaction.reply({ content: `Hàng đợi vừa được xóa. 🗑️` }).catch(e => { })
    },
}
