module.exports = {
    name: "resume",
    description: "Khởi động lại nhạc đã tạm dừng.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setPaused(false);

        return interaction.reply({ content: success ? `**${queue.current.title}**, Bài hát tiếp tục phát. ✅` : `Đã xảy ra lỗi. ❌ Nó giống như bạn đã không ngừng âm nhạc trước đây.` }).catch(e => { })
    },
};
