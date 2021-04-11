
module.exports =  {

        name: 'viewitem',     
        aliases : ['vi'],
        usesArguments: {
            
            array: false,
            argType: 'string',
        },
        description: 'finds item properties',
        callback: async (client, message, {argument}) => {

const {MessageEmbed} = require('discord.js')
  
const paginationEmbed = require('discord.js-pagination');
let { allDBS : {itemsDB } } = require('../../../index')

var pages = []
var arrayOfAllItems = await new Promise((resolve) => {itemsDB.find({}, function(err, docs) {

    resolve(docs)

    })

})


for (var itemsStored of arrayOfAllItems) {

    var valuesOfItem = Object.values(itemsStored)

    if(valuesOfItem.some( value => value.toLowerCase() === argument.toLowerCase())) {

    let itemEmbeds = new MessageEmbed()

    .setTitle(itemsStored.title)

    .addField('Value', itemsStored.value, true)
    .addField('Rarity', itemsStored.rarity, true)
    .setColor(checkRarityOfItem())
    .setImage(itemsStored.image)
    .setDescription(itemsStored.description)
    // find way to make the object result into an message Embed


    pages.push(itemEmbeds)

    }

    function checkRarityOfItem() {

        if(itemsStored.rarity === 'uncommon') {

            return '#808080'


        } else if (itemsStored.rarity === 'rare') {


            return '#5CFF5C'

        } else if(itemsStored.rarity === 'legendary') {


            return '#c12020'

        } else if(itemsStored.rarity === 'mystic') {

            return ' #f7a537 '

        }



    }




}




pages.length < 1 ? message.channel.send('Nothing found!') : paginationEmbed(message, pages)
















        }



    } 

























