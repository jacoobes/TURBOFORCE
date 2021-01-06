const commando = require('discord.js-commando')
const axios = require('axios').default
const {MessageEmbed} = require('discord.js')

module.exports = class yesNo extends commando.Command {

constructor(client) {

    super(client, {

        name: 'yesno',
        aliases: ['yn'],
        group: 'fun',
        memberName: 'yesno',
        description: "Let the bot guide your choices.",
        examples: ["tcp yn Am I a poop?"]

    })



}

async run(message, args) {


    var options = {

        method: 'GET',
        url: `https://yesno.wtf/api`

    }


    async function getData() {

        var apiCall = await axios.request(options)

        var yesNoEmbed = new MessageEmbed()

        .setTitle(`👍 ${args} 👎`)
        .setDescription(`${apiCall.data.answer}`)
        .setColor('#FFD700')
        .setThumbnail(message.author.displayAvatarURL())
        message.channel.send(yesNoEmbed) 
        

    }


getData()





}













}