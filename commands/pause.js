module.exports = {
    name: "pause",
    description: "Dừng phát nhạc hiện đang phát.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setPaused(true);

        return interaction.reply({ content: success ? `Bản nhạc hiện đang phát có tên **${queue.current.title}** đã dừng ✅` : `Đã xảy ra lỗi. ❌` }).catch(e => { })
    },
}
