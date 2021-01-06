const commando = require('discord.js-commando')
const {MessageEmbed} = require('discord.js')
const {items} = require(`../../index`)  
const paginationEmbed = require('discord.js-pagination');

module.exports = class viewItem extends commando.Command {

constructor(client) {


    super(client, {

        name: 'viewitem',     
        aliases : ['vi'],
        group: 'currency',
        memberName: 'viewitem',
        description: 'finds item properties',




    })





}

async run(message, args) {

var pages = []
var arrayOfAllItems = items.all()



for (var itemsStored of arrayOfAllItems) {

var eachItem = items.get(itemsStored.ID)

const valuesInAnArray = Object.values(eachItem)

if(valuesInAnArray.some( value => value.toLowerCase() === args.toLowerCase())) {



console.log(eachItem)

var itemEmbeds = new MessageEmbed()

.setTitle(eachItem.title)

.addField('Value', eachItem.value, true)
.addField('Rarity', eachItem.rarity, true)
.setColor(checkRarityOfItem())
.setImage(eachItem.image)
.setDescription(eachItem.description)
// find way to make the object result into an message Embed


pages.push(itemEmbeds)

    }

    function checkRarityOfItem() {

        if(eachItem.rarity === 'uncommon') {

            return '#808080'


        } else if (eachItem.rarity === 'rare') {


            return '#5CFF5C'

        } else if(eachItem.rarity === 'legendary') {


            return '#c12020'

        } else if(eachItem.rarity === 'mystic') {

            return ' #f7a537 '

        }



    }




}



pages.length < 1 ? message.channel.send('Nothing found!') : paginationEmbed(message, pages)



}











}