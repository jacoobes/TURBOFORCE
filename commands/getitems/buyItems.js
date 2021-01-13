const commando = require('discord.js-commando');
const {items, accounts, dailyStore} = require('../../index');
const {MessageEmbed} = require('discord.js');

module.exports = class buyItems extends commando.Command {

    constructor(client) {

        super(client, {
    
            name: 'buy',
            aliases: ['purchase'],
            group: 'getitems',
            memberName: 'buy',
            examples: ['tcp buy <number>'],
            description: "Buy an item from the daily store",
         
    
        })
    
    
    
    
    }

async run(message, args) {

   
    var storeValues = transformDatabaseEmbed();



    console.log(storeValues);

    
    

   var whoWantsToBuyItem = accounts.get(message.author.id); 












function transformDatabaseEmbed() {

    var databaseEmbed = dailyStore.get('StoreEmbed')

    databaseEmbed = new MessageEmbed(databaseEmbed);

    databaseEmbed = databaseEmbed.toJSON().fields;

return databaseEmbed

}


    
}










    
}