const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const config = require("./config")
const TOKEN = config.TOKEN || process.env.TOKEN;
const fs = require('fs');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.MessageContent // enable if you need message content things
  ],
})

client.config = config;
client.player = new Player(client, client.config.opt.discordPlayer);
const player = client.player

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Sự kiện đã tải: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
    try {
      let props = require(`${config.commandsDir}/${f}`);
      client.commands.push({
        name: props.name,
        description: props.description,
        options: props.options
      });
      console.log(`Đã tải lệnh: ${props.name}`);
    } catch (err) {
      console.log(err);
    }
  });
});


player.on('trackStart', (queue, track) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    if (queue.metadata) {
      queue.metadata.send({ content: `🎵 Nhạc bắt đầu phát: **${track.title}** -> Kênh: **${queue.connection.channel.name}** 🎧` }).catch(e => {
        console.error(e);
      });
    }
  }
});

player.on('trackAdd', (queue, track) => {
  if (queue) {
    if (queue.metadata) {
      queue.metadata.send({ content: `**${track.title}** đã thêm vào danh sách phát. ✅` }).catch(e => { })
    }
  }
});

player.on('channelEmpty', (queue) => {
  if (queue) {
    if (queue.metadata) {
      queue.metadata.send({ content: `Tôi đã rời khỏi kênh âm thanh vì không có ai trong kênh âm thanh của tôi. ❌` }).catch(e => { })
    }
  }
});

player.on('queueEnd', (queue) => {
  if (client.config.opt.voiceConfig.leaveOnTimer.status === true) {
    if (queue) {
      setTimeout(() => {
        if (queue.connection) {
          if (!queue.playing) {
            queue.connection.disconnect()
          }
        };
      }, client.config.opt.voiceConfig.leaveOnTimer.time);
    }
    if (queue.metadata) {
      queue.metadata.send({ content: `Tất cả hàng đợi chơi đã kết thúc, tôi nghĩ bạn có thể nghe thêm một số bản nhạc. ✅` }).catch(e => { })
    }
  }
});

player.on("error", (queue, error) => {
  if (queue) {
    if (queue.metadata) {
      queue.metadata.send({ content: `Tôi đang gặp sự cố khi cố kết nối với kênh thoại. ❌ | ${error}` }).catch(e => { })
    }
  }
})

if (TOKEN) {
  client.login(TOKEN).catch(e => {
    console.log("Token Bot mà bạn đã nhập vào dự án của mình không chính xác hoặc sự quan tâm của Bot của bạn đang TẮT!")
  })
} else {
  console.log("Vui lòng đặt mã thông báo bot trong token.js hoặc trong tệp .env trong dự án của bạn!")
}

setTimeout(async () => {
  const db = require("croxydb")
  await db.delete("queue")
  await db.delete("loop")
}, 2000)

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);