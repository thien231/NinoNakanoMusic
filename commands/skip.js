module.exports = {
    name: "skip",
    description: "Chuyển đổi nhạc đang phát.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })

        const success = queue.skip();

        return interaction.reply({ content: success ? `**${queue.current.title}**, Bài hát bị bỏ qua ✅` : `Đã xảy ra sự cố ❌` }).catch(e => { })
    },
};
