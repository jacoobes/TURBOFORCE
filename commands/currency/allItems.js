

const commando = require('discord.js-commando');
const { all } = require('quick.db');

module.exports = class allItems extends commando.Command {


    constructor(client) {
        super( client, {

           name: 'allitems',     
           aliases : ['ai'],
           group: 'currency',
           memberName: 'allitems',
           description: 'finds item properties',
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

    console.log(items)

    

    
    if(isAuthorizedUser()) {

      
    




        }
    
        var messageToPost = "";

     for (var itemsStored of items.fetchAll()) {

       var eachItem = items.get(itemsStored.ID) 

       console.log(allItems[item_value])

       messageToPost += `**${itemsStored.ID}** : ${eachItem[item_value]} `

     }   
    
   
    
    
    
    message.channel.send(messageToPost)
    
        
    
          
        

            function isAuthorizedUser() {

                if(message.author.id === `182326315813306368` || message.author.id === '304386631719452682' || message.author.id === '383101377347584012' ) return true
            
                else message.reply("Not an authorized user"); return false;
            
            }        






    }



}

