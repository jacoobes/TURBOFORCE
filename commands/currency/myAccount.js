


const { MessageEmbed } = require('discord.js')
const commando = require('discord.js-commando')
const { accounts, items } = require('../..')

module.exports = class myAccount extends commando.Command {

constructor(client) {


    super(client, {

        name: 'account',     
        group: 'currency',
        aliases: ['acc', 'balance', 'bal'],
        memberName: 'account',
        description: 'your account',
        throttling: {

            usages: 3,
            duration: 60 

        }

    })


}

async run(message) {

const {MessageEmbed} = require('discord.js')



var accountEmbed = new MessageEmbed()

.setColor(message.member.displayHexColor)
.setTitle(`♣︎ ${message.author.username}'s account ♣︎`)
.addFields(

{name: "Balance in Hand", value: accounts.get(`${message.author.id}.balanceInHand`), inline: true},

{name: "Balance in Bank", value: accounts.get(`${message.author.id}.balanceInBank`), inline: true}

)

.setThumbnail(message.author.avatarURL())

getAllItemsForEmbed()


message.channel.send(accountEmbed)

function getAllItemsForEmbed() {
    
    var yourAccount = accounts.get(`${message.author.id}.Items`)
    let stringOfAllItems = "";


    yourAccount.sort()

    console.log(yourAccount)

    let uniqueEntries = [...new Set(yourAccount.map(item => item.title))]

    console.log(uniqueEntries)

for(var i = 0; i < uniqueEntries.length; i++) { 

    let countOfSameItem = 0;

    for(var item of yourAccount ) {


        if(item.title === uniqueEntries[i]) {

            countOfSameItem++;
            

        } 

    }


stringOfAllItems += `**${countOfSameItem}** ${uniqueEntries[i]} \n`

    }
accountEmbed.addField('Items', null ? 'No items at the moment' : stringOfAllItems)

}


    }

}





/*
uniqueEntries = uniqueEntries.reduce((accumulator, currentValue, index) => {

        accumulator.push({title: currentValue, value: valuesOfEntries[index]})

        return accumulator

    }, [])


    my first working reduce method usage!
*/ 

