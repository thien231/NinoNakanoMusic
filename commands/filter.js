const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "filter",
  description: "Thêm bộ lọc âm thanh vào nhạc đang diễn ra.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'filtre',
    description: 'Nhập bộ lọc bạn muốn áp dụng. (bassboost, 8D, nightcore, mono, karaoke)',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing) return interaction.reply({ content: `Hiện không có bản nhạc nào đang phát !. ❌`, ephemeral: true }).catch(e => { })
    const filtre = interaction.options.getString('filtre')

    if (!filtre) return interaction.reply({ content: `Vui lòng nhập tên bộ lọc hợp lệ. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })


    const filters = ["bassboost", "8D", "nightcore", "mono", "karaoke"];
    //other filters: https://discord-player.js.org/docs/main/master/typedef/AudioFilters 

    const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

    if (!filter) return interaction.reply({ content: `Tôi không thể tìm thấy bộ lọc có tên của bạn. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })
    const filtersUpdated = {};
    filtersUpdated[filter] = queue["_activeFilters"].includes(filter) ? false : true;
    await queue.setFilters(filtersUpdated);

    interaction.reply({ content: `Applied: **${filter}**, Filter Status: **${queue["_activeFilters"].includes(filter) ? 'Active' : 'Inactive'}** ✅\n **Remember, if the music is long, the filter application time may be longer accordingly.**` }).catch(e => { })
  },
};
