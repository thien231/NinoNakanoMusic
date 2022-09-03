const { ApplicationCommandOptionType } = require('discord.js');
const db = require('croxydb');
module.exports = {
    name: "dj",
    description: "Cho phép bạn thiết lập hoặc đặt lại vai trò DJ.",
    permissions: "0x0000000000000020",
    options: [{
        name: "set",
        description: "Cho phép bạn thiết lập hoặc đặt lại vai trò DJ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'role',
                description: 'Đề cập đến vai trò DJ.',
                type: ApplicationCommandOptionType.Role,
                required: true
            }
        ]
    },
    {
        name: "reset",
        description: "Cho phép bạn tắt vai trò DJ.",
        type: ApplicationCommandOptionType.Subcommand,
        options: []
    }
    ],
    run: async (client, interaction) => {

        let stp = interaction.options.getSubcommand()
        if (stp === "set") {
            const role = interaction.options.getRole('role')
            if (!role) return interaction.reply("Nếu bạn không chỉ định vai trò DJ, bạn sẽ không thể sử dụng lệnh!").catch(e => { });

            await db.set(`dj-${interaction.guild.id}`, role.id)
            return await interaction.reply({ content: "Vai trò DJ được đặt thành công thành <@&" + role + ">.", ephemeral: true }).catch(e => { });

        }
        if (stp === "reset") {
            const data = db.get(`dj-${interaction.guild.id}`)

            if (data) {
                await db.delete(`dj-${interaction.guild.id}`)
                return await interaction.reply({ content: "Vai trò DJ đã được xóa thành công.", ephemeral: true }).catch(e => { });
            } else {
                return await interaction.reply({ content: "Vai trò DJ chưa được thiết lập.", ephemeral: true }).catch(e => { });
            }

        }
    },
};
