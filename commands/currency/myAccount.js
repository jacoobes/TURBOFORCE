


const { MessageEmbed } = require('discord.js')
const commando = require('discord.js-commando')
const { accounts, items } = require('../..')

module.exports = class myAccount extends commando.Command {

constructor(client) {


    super(client, {

        name: 'account',     
        group: 'currency',
        memberName: 'account',
        description: 'your account',
        throttling: {

            usages: 3,
            duration: 60 

        }

    })


}

async run(message) {

const accountList = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/account.json`)


const {MessageEmbed} = require('discord.js')



var accountEmbed = new MessageEmbed()

.setColor(message.member.displayHexColor)
.setTitle(`♣︎ ${message.author.username}'s account ♣︎`)
.addFields(

{name: "Balance in Hand", value: accounts.get(`${message.author.id}.balanceInHand`), inline: true},

{name: "Balance in Bank", value: accounts.get(`${message.author.id}.balanceInBank`), inline: true},

{name: "Items", value: undefined ? "No items at the moment" : getAllItems(), inline: false}

)


.setThumbnail(message.author.avatarURL())



module.exports.accountEmbed = accountEmbed

message.channel.send(accountEmbed)

function getAllItems() {

var yourAccount = accounts.get(`${message.author.id}.Items`)

var yourPossessions = yourAccount.Items


for (yourPossessions of yourAccount) {

return `**${yourPossessions.title}** (${yourPossessions.value}) ` 

        }


    }


}








}