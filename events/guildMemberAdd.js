

module.exports = {
    listener: "on",
    callback:  (payload, member) => {
        member.guild.channels.cache.get('785249012558987317').send('welcome yo')
    }
}