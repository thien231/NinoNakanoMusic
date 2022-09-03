module.exports = {
    name: "stop",
    description: "Phát lại bản nhạc trước đó.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })

        queue.destroy();

        interaction.reply({ content: `Nhạc đang phát trên máy chủ này đã bị tắt, hẹn gặp lại các bạn lần sau ✅` }).catch(e => { })
    },
};
