/*
const {items, accounts, dailyStore} = require('../../index');
const {MessageEmbed} = require('discord.js');

const { config } = require('winston');

module.exports = class buyItems extends commando.Command {

    constructor(client) {

        super(client, {
    
            name: 'buy',
            aliases: ['purchase'],
            group: 'getitems',
            memberName: 'buy',
            examples: ['tcp buy <number>'],
            description: "Buy an item from the daily store",
            args:[ 

                {
                    key: 'number',
                    prompt: 'Which item would you like to buy?',
                    type: 'integer',
                    oneOf: [1,2,3,4,5,6]

                }


            ]
    
        })
    
    
    
    
    }

async run(message, {number}) {

   var storeItemsForToday = [];
   
   var mappedStoreItems = new Map();
   var theItemWanted;

    storeItemsForToday = getDailyItems()

    

    storeItemsForToday.forEach((currentValue, index) => {


        mappedStoreItems.set(index + 1, currentValue)



    })

    

    for (let [key, value] of mappedStoreItems ) {

        key === number ? theItemWanted = value : ""; 

        

    } 

if(accounts.get(`${message.author.id}.balanceInHand`) < theItemWanted.value ) {message.reply('Not enough funds on hand'); return; } ;
message.channel.send(`Are you sure you want to buy ${theItemWanted.title} for ${theItemWanted.value}?`)

let filter = (m => m.author.id === message.author.id);
var answer = await message.channel.awaitMessages(filter, {max: 1}) 
var contentOfMessage = answer.first().content
var sentAMessage = saidYes(contentOfMessage);

confirm()


function confirm() { 
    
 
    setTimeout(() => {


        if(sentAMessage) {

        message.reply('Resolving purchase...')

            if(accounts.get(`${message.author.id}.balanceInHand`) >= theItemWanted.value){ 
        
                message.reply(`Succesfully bought ${theItemWanted.title} ${theItemWanted.image}`)
                accounts.push(`${message.author.id}.Items`, theItemWanted);
                accounts.subtract(`${message.author.id}.balanceInHand`, theItemWanted.value)
         

                        }

            
        } else {

            message.reply('Canceled purchase')


            }
        



    }, 4000)


   


}



function getDailyItems() {

   for(var i = 1; i < 7; i++) {

    var IDforItems = dailyStore.get(`${i}`)

    storeItemsForToday.push(items.get(`${IDforItems}`))
    

   }

   return storeItemsForToday;

}


function saidYes(response) {
    
    return Boolean(response === 'yes')

    
}


    
}










    
}

*/