module.exports = async (client, oldState, newState) => {
  if (client.user.id === newState.id) {
    if (oldState.channelId && !newState.channelId) {
      const queue = client.player?.getQueue(newState.guild.id)
      if (queue) {
        if (queue.playing) {
          if (queue.metadata) {
            queue.metadata.send({ content: "Xin lỗi, tôi đã rời khỏi kênh âm thanh. Tôi hy vọng ai đó không đá tôi khỏi kênh. 😔" }).catch(e => { })
          }
          client.player?.deleteQueue(queue.metadata.guild.id)
        }
      }
    }
  }
}
