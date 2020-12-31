

const commando = require('discord.js-commando')

module.exports = class allItems extends commando.Command {


    constructor(client) {
        super( client, {

           name: 'allitems',     
           aliases : ['ai'],
           group: 'currency',
           memberName: 'allitems',
           description: 'finds item properties'
           
        })
        

        

    }

    async run(message, args) {




    if(message.author.bot) return;


    const listOfAllItemNames = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`)
    var keysOfObj = []

    
    if(isAuthorizedUser()) {

        listOfAllItemNames.allItems.forEach(object => {
    
            return keysOfObj = Object.keys(object)
        
    
        })
    
        
    if(isNotValidKey()) return;
    
    
        
        var itemsFromFile = listOfAllItemNames
        var messageToPost = "";
    
    
        itemsFromFile.allItems.forEach(arrayElement =>{
    
        var propertyOfItem = arrayElement[args]

        messageToPost += `**${arrayElement.title}**:${propertyOfItem}, `
    
    })
    
    
    if(messageToPost.length >= 2000) {

    var pageTwo = messageToPost.split(" ", messageToPost.length / 2)

    console.log(pageTwo)

    }
    
    message.channel.send(messageToPost)
    
        
    
    }         
        

            function isNotValidKey() {

                var oneOfTheKeys = keysOfObj.find(el => el === args)
            
                if(oneOfTheKeys === undefined) {
                message.reply('Not a proper parameter.')
            
                return true;
            
                }
                return;
                }

            function isAuthorizedUser() {

                if(message.author.id === `182326315813306368` || message.author.id === '304386631719452682' || message.author.id === '383101377347584012' ) return true
            
                else message.reply("Not an authorized user"); return false;
            
            }        






    }



}

