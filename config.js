module.exports = {
    TOKEN: "OTkyNzMyOTM0MzkxOTk2NDI2.Gy30LW.E75EZV8wsWyqAKgfyPtzpSdVN-J87mHgQvT4u4",
    ownerID: "466737838248165386",
    botInvite: "https://discord.gg/cGwWAyZMqg",
    commandsDir: './commands',

    opt: {
        DJ: {
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume']
        },

        voiceConfig: {
            leaveOnEnd: false,
            autoSelfDeaf: false,

            leaveOnTimer: {
                status: true,
                time: 20000,
            }
        },

        maxVol: 100,
        loopMessage: false,

        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
}
