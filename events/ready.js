const config = require("../config.js");
module.exports = async (client) => {

    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log("Đã tải lại thành công các lệnh [/] ứng dụng.");
        } catch (err) {
            console.log("Lỗi khi tải lại các lệnh [/] ứng dụng: " + err);
        }
    })();

    console.log(client.user.username + " kết nối thành công.");
    client.on('ready', () => { 
        client.user.setActivity("MunNeee", {type: "STREAMING", url: "https://www.twitch.tv/munkiaaa"})
         console.log(`Successfully enabled Streaming Mode.`)
      })

}
