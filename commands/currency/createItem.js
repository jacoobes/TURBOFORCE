const commando = require(`discord.js-commando`)


module.exports = class newItem extends commando.Command {

    constructor(client) {

        super(client, {

            name: 'createitem',
            alias: ['newitem', 'ci', 'ni'],
            group: 'currency',
            memberName: 'createitem',
            description: 'If an authorized user, you can create items for the currency system.',
            examples: [`tcp createitem Chicken-Soup 10 Homemade-soup common *img link* id number (make sure id is at least 10 numbers long)`],
            args: [
                {
                    key: 'title',
                    prompt: 'What would you like to set the title to?',
                    type: 'string'
                },

                {
                    key: 'value',
                    prompt:'What would you like to set the MSRP price for?',
                    type: 'string'

                },
                {
                    key:'description',
                    prompt: "What would you like to set the description as?",
                    type: 'string'
                },
                {
                    key:'rarity',
                    prompt:"What would you like to set the rarity to? (common, uncommon, rare, legendary, mystic)",
                    type: 'string',
                    oneOf : ['common', 'uncommon', 'rare', 'legendary', 'mystic']
                
                }, 
                {
                    key: "image",
                    prompt:"What link would you like to set as the image?",
                    type: "string",
                    validate : (image) => {
                            return image.match(/\.(jpeg|jpg|gif|png)$/) != null;
                            
                    }
                },
                {
                    key: "id",
                    prompt:"What would you like to set as the id?",
                    type: "string",
                    default: ""
                }

            ],

        })


    }

    async run(message, {title, value, description, rarity, image, id}){

const fs = require(`fs`);
const {MessageEmbed} = require(`discord.js`);

const itemsList = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`);




        if(isAuthorizedUser()) {
        

            console.log(title, value, description, rarity, image, id )
            
            sendEmbed()

            confirmationMessage()


        }




        function isAuthorizedUser() {

            if(message.author.id === `182326315813306368` || message.author.id === '304386631719452682' || message.author.id === '383101377347584012' ) return true
        }

        function sendEmbed() {

            if(!(image.match(/\.(jpeg|jpg|gif|png)$/) != null)) return;

            var embed = new MessageEmbed()

            embed.setTitle(replaceDashesWithSpacesFor(title))

            embed.addFields(

                {name: `Value`, value: value, inline: false },
                {name: `Description`, value: replaceDashesWithSpacesFor(description), inline: false},
                {name: `Rarity`, value: rarity, inline: false},
                {name: `Image`, value: image, inline: true},
                {name: "Id", value: id, inline: false})
                .setImage(image)
        
            message.channel.send(embed)


        }


        function replaceDashesWithSpacesFor(string){

            string = string.replace(/-/g, ' ');
        
            return string
        }
/*
//going to need to find a way to set the default value of argument id i
        function randomId(){

            var id = ""
            var isAddingNumbers = 0
    
            while(isAddingNumbers <= 12){
    
                var randomNumber = Math.round(Math.random() * 12)
    
                id += randomNumber
    
                isAddingNumbers++
            }
    
            return id;

    }
*/
function confirmationMessage() {
    
    if(!(image.match(/\.(jpeg|jpg|gif|png)$/) != null)) {message.reply('Not a valid image link'); return;}

    message.channel.send("Do you want to create this item?")

    message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 15000}).then(collected => {

    if (collected.first().content.toLowerCase() == 'yes') {

            message.reply("Item Created")
                       
            var newItemObj = {

            allItems : []

            }

        writetoFile(newItemObj)
   

    }
        else message.reply('Operation canceled.');  return false;  

        
    
}) .catch(() => {

    message.reply('No answer after 7 seconds, operation canceled.');

});
        
function writetoFile(object){

    fs.readFile('C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json', 'utf8', function readFileCallback(err,data) {

        if(err){

            console.error(err)
        }

        else {

        object = JSON.parse(data)    

        object.allItems.push({

            title: replaceDashesWithSpacesFor(title),
            value: value,
            description: replaceDashesWithSpacesFor(description),
            rarity: rarity,
            image: image,
            id: id

        })

    
        object = JSON.stringify(object, null, 5)
        
        fs.writeFile('C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json', object, 'utf8', function(err){
        console.error(err)

                        })
            

                    }

                })    
            }
    
        }
    }
}



