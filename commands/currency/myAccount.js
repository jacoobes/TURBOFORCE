


const { MessageEmbed } = require('discord.js')
const commando = require('discord.js-commando')

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

var whoAccessAccount = accountList.allAccounts.find(user => user.userId === message.author.id)




const {MessageEmbed} = require('discord.js')



const accountEmbed = new MessageEmbed()

.setColor(message.member.displayHexColor)

.setTitle(`♣︎ ${message.author.username}'s account ♣︎`)

.addField("Balance in Hand", whoAccessAccount.balanceInHand, true)

.addField("Balance in Bank", whoAccessAccount.balanceInBank, true)



.setThumbnail(message.author.avatarURL())

message.channel.send(accountEmbed)


function findItemDuplicates() {


    
}




}








}