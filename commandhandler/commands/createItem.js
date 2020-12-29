const fs = require(`fs`);
const {MessageEmbed, Message} = require(`discord.js`);

const itemsList = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`);


module.exports = {

    commands: ['newitem'],
    expectedArgs: '<title> <value> <description> <rarity> <image> <id>',
    permissionError: 'You need more permissions to run this command',
    minArgs: 7,
    maxArgs: 7,
    callback: (message, arguments, text) =>{
        

var saidYes;

if(isAuthorizedUser()) {



    argumentsForNewItem = arguments.slice(1,7)


    sendEmbed(argumentsForNewItem)

    confirmationMessage()

    if(saidYes) {

        [title, value, description, rarity, image, id] = argumentsForNewItem

    

    var newItemObj = {

        allItems : []
    
    }


    fs.readFile('C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json', 'utf8', function readFileCallback(err,data) {

        if(err){
            console.error(err)
            }

        else {

        newItemObj = JSON.parse(data)    

        newItemObj.allItems.push({

            title: replaceDashesWithSpacesFor(title),
            value: value,
            description: replaceDashesWithSpacesFor(description),
            rarity: rarity,
            image: image,
            id: id

        })

        
    
   itemsListInJson = JSON.stringify(newItemObj, null, 5)


    fs.writeFile('C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json', itemsListInJson, 'utf8', function(err){
        console.error(err)

                })
            
            }



        })    


    }

} else {

message.reply(`Not authorized to access this command`)



}
    
      
      

      
    

      
function isAuthorizedUser() {

    if(message.author.id === `182326315813306368` || message.author.id === '304386631719452682' || message.author.id === '383101377347584012' ) return true
}



function sendEmbed (fields) {


[title, value, description, rarity, image, id] = fields

    var embed = new MessageEmbed()

    embed.setTitle(replaceDashesWithSpacesFor(title))
    embed.addFields(
        {name: `Value`, value: value, inline: false },
        {name: `Description`, value: replaceDashesWithSpacesFor(description), inline: false},
        {name: `Rarity`, value: rarity, inline: false},
        {name: `Image`, value: image, inline: true},
        {name: "Id", value: id, inline: false}
    )
    .setImage(image)
    
    message.channel.send(embed)


}



function replaceDashesWithSpacesFor(string){

    string = string.replace(/-/g, ' ');

    return string
}


function confirmationMessage() {
    

    message.channel.send("Do you want to create this item?")

    message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 15000}).then(collected => {

                
                // only accept messages by the user who sent the command
                // accept only 1 message, and return the promise after 30000ms = 30s
    
                // first (and, in this case, only) message of the collection
    if (collected.first().content.toLowerCase() == 'yes') {

            message.reply("Item Created")
                       
            [title, value, description, rarity, image, id] = argumentsForNewItem

    

            var newItemObj = {

            allItems : []

            }


    fs.readFile('C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json', 'utf8', function readFileCallback(err,data) {

        if(err){

            console.error(err)
        }

        else {

        newItemObj = JSON.parse(data)    

        newItemObj.allItems.push({

            title: replaceDashesWithSpacesFor(title),
            value: value,
            description: replaceDashesWithSpacesFor(description),
            rarity: rarity,
            image: image,
            id: id

        })

        
    
        itemsListInJson = JSON.stringify(newItemObj, null, 5)


        
        fs.writeFile('C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json', itemsListInJson, 'utf8', function(err){
        console.error(err)

            })
            

        }



    })    


}
        else message.reply('Operation canceled.');  return false;  

        })
        
        
        .catch(() => {

                message.reply('No answer after 7 seconds, operation canceled.');

            });



}


     
    },
    permissions: [],
    requiredRoles: []
}