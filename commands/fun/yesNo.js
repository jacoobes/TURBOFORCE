module.exports = {
    name: 'yesno',
    aliases: ['yn'],
    description: 'Let the bot guide your choices.',
    withMultipleArguments: false,
    argType: 'string',
    callback: async (client, message, arguments) => {

        const axios = require('axios').default
        const { MessageEmbed } = require('discord.js')

        var options = {
            method: 'GET',
            url: `https://yesno.wtf/api`,
        } 
       
            var apiCall = await axios.request(options)

            var yesNoEmbed = new MessageEmbed()

                .setTitle(`👍 ${arguments} 👎`)
                .setDescription(`${apiCall.data.answer}`)
                .setColor('#FFD700')
                .setThumbnail(message.author.displayAvatarURL())
                
            message.channel.send(yesNoEmbed)
        

        
    },
}
