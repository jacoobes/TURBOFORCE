

const commando = require('discord.js-commando');
const { all } = require('quick.db');

module.exports = class allItems extends commando.Command {


    constructor(client) {
        super( client, {

           name: 'allitems',     
           aliases : ['ai'],
           group: 'currency',
           memberName: 'allitems',
           description: 'finds all item properties',
           args: [

            {
             key: 'item_value',
             prompt: "What would you like to search for?",
             oneOf: ['title', "description", "value", "rarity", "image"],
             type: 'string'

            }


           ]
           
        })
        

        

    }

    async run(message, {item_value}) {

    if(message.author.bot) return;

    const {items} = require(`../../index`)
    
        var messageToPost = "";

     for (var itemsStored of items.fetchAll()) {

       var eachItem = items.get(itemsStored.ID) 


       messageToPost += `**${itemsStored.ID}** : ${eachItem[item_value]}, `

     }   
    
   
    
    
    
    message.channel.send(messageToPost, {split : true})
    
        





    }



}

