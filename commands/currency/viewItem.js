
module.exports =  {

        name: 'viewitem',     
        aliases : ['vi'],
        group: 'currency',
        description: 'finds item properties',
        callback: (client, message, arguments) => {

const {MessageEmbed} = require('discord.js')
const {items} = require(`../../index`)  
const paginationEmbed = require('discord.js-pagination');
            

var pages = []
var arrayOfAllItems = items.all()



for (var itemsStored of arrayOfAllItems) {

    var entriesForEmbed = items.get(itemsStored.ID)

    const valuesInAnArray = Object.values(entriesForEmbed)

    if(valuesInAnArray.some( value => value.toLowerCase() === args.toLowerCase())) {





    var itemEmbeds = new MessageEmbed()

    .setTitle(entriesForEmbed.title)

    .addField('Value', entriesForEmbed.value, true)
    .addField('Rarity', entriesForEmbed.rarity, true)
    .setColor(checkRarityOfItem())
    .setImage(entriesForEmbed.image)
    .setDescription(entriesForEmbed.description)
    // find way to make the object result into an message Embed


    pages.push(itemEmbeds)

    }

    function checkRarityOfItem() {

        if(entriesForEmbed.rarity === 'uncommon') {

            return '#808080'


        } else if (entriesForEmbed.rarity === 'rare') {


            return '#5CFF5C'

        } else if(entriesForEmbed.rarity === 'legendary') {


            return '#c12020'

        } else if(entriesForEmbed.rarity === 'mystic') {

            return ' #f7a537 '

        }



    }




}




pages.length < 1 ? message.channel.send('Nothing found!') : paginationEmbed(message, pages)
















        }



    } 

























