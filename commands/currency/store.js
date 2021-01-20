/*
const commando = require(`discord.js-commando`);
const {MessageEmbed} = require('discord.js');
const {items, dailyStore} = require('../../index');
const DailyDay = new Date()

var allDatabaseArray = items.all()
var storeArray = []
var entriesForEmbed




module.exports = class StoreEmbed extends commando.Command {


constructor(client) {

    super(client, {

        name: 'store',
        group: 'currency',
        description: 'daily store of Items',
        memberName: 'store'




    })



}
async run(message) {


   
var StoreEmbed = new MessageEmbed()

for(var i = 0; i < 6; i++) {

    var random = Math.floor(Math.random() * allDatabaseArray.length)
    storeArray.push(allDatabaseArray[random])

    addNewItems();

entriesForEmbed = items.get(storeArray[i].ID)



StoreEmbed.addField(`${i + 1} : `,`${checkRarityOf(entriesForEmbed)} *${entriesForEmbed.title}* ⟹  \`${entriesForEmbed.value}\``, false)



}



StoreEmbed.setTitle(`✯ Daily Store for ${DailyDay.toLocaleDateString()} ✯`)
StoreEmbed.setColor('#c12020')
StoreEmbed.setImage(this.client.user.displayAvatarURL())

if(DailyDay.getDay() === dailyStore.get('Day')) {



    console.log('still same day')

    var databaseEmbed = new MessageEmbed(dailyStore.get('StoreEmbed'))

    
    message.channel.send(databaseEmbed)
    
   


} else {

    message.channel.send(StoreEmbed)

    dailyStore.set('Day', DailyDay.getDay())    

    console.log('Not same day')

    dailyStore.set('StoreEmbed', StoreEmbed)

    for(var i = 0; i < 6; i++) {
        dailyStore.set(`${i+1}`, storeArray[i].ID)
        
        }
   

    }


function checkRarityOf(item) {

        if(item.rarity === 'uncommon') {

            return '⚪️'


        } else if (item.rarity === 'rare') {


            return '🟢'

        } else if(item.rarity === 'legendary') {


            return '🔴'

        } else if(item.rarity === 'mystic') {

            return ' ❗️🟠❗️ '

        } else{

            return '⚫️'

        }



    }

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      
      function addNewItems() {

        if(hasDuplicates(storeArray)) {

            storeArray = storeArray.filter(onlyUnique);
            
            for(var i = 0; i < 6 - storeArray.length; i++) {
                var newRandomAdd = Math.floor(Math.random() * allDatabaseArray.length)
                storeArray.push(allDatabaseArray[newRandomAdd])


            }
            
            return storeArray;
    
    
    
    
        }


      }


}




}



*/


