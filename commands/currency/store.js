

module.exports =  {

  name: 'store',
  aliases:['shop'],
  argType: 'string',
  withMultipleArguments : false,
  description: 'daily store of Items',
  callback: async (client, message, arguments) => {

      const {MessageEmbed} = require('discord.js');
        let {allDBS: {itemsDB, dailyStoreDB} } = require('../../index');
        const DailyDay = new Date()
        let entriesForEmbed;
        let entriesForEmbedArray = [];
      var StoreEmbed = new MessageEmbed()
      
    let { randomInt } = require("mathjs");

     let allItems = await new Promise((resolve, reject) => {
     itemsDB.find({}, function (err, docs) {
         resolve(docs);
         });
     });


     let databaseEmbed = await new Promise((resolve,reject)=>{

         dailyStoreDB.findOne({_id: 'LLRLhFryWEvDge7E'}, function(err, docs){

            resolve(docs.embed)
            
        })

     })


        
    StoreEmbed.setTitle(`✯ Daily Store for ${DailyDay.toLocaleDateString()} ✯`)
    StoreEmbed.setColor('#c12020')
    

    dailyStoreDB.find({day: DailyDay.getDay()}, async function(err, docs){

        if(docs.length < 1) {

          
            getItems()

            dailyStoreDB.update({_id: "x1qSo8oXKktAHkhQ"},{itemArray: entriesForEmbedArray} )

           dailyStoreDB.update({_id: "IKxjvFdx6HoVONBo"}, {$set: {day: DailyDay.getDay()} } )

            message.channel.send(StoreEmbed)
  
            
          dailyStoreDB.update({embed : databaseEmbed}, {embed : StoreEmbed})

        
 

        } else {

            

            console.log('still same day')

             databaseEmbed = new MessageEmbed(databaseEmbed)
        
            
             message.channel.send(databaseEmbed)

        }

    

    })

   

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

  function getItems(){

    for(var i = 0; i < 6; i++) {
        
        entriesForEmbed = allItems[randomInt(0, allItems.length - 1)];
        entriesForEmbedArray.push(entriesForEmbed._id)

       allItems = allItems.filter((item) => item._id !== entriesForEmbed._id);

       StoreEmbed.addField(`${i} : `,`${checkRarityOf(entriesForEmbed)} *${entriesForEmbed.title}* ⟹  \`${entriesForEmbed.value}\``, false)

       
       
       }



  }


  }



   



}


   










