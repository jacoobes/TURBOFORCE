
module.exports =  {
        name: 'account',
        withMultipleArguments: false,
        argType: 'string',     
        aliases: ['acc', 'balance', 'bal'],
        description: 'your account',
        callback : (client, message, arguments) => {

const {MessageEmbed} = require('discord.js')
const {accounts} = require('../..')


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
    
    let uniqueEntries = [...new Set(yourAccount.map(item => item.title))]
    yourAccount.sort()

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

    
    





/*


    

*/
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

