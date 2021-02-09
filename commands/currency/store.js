

module.exports =  {

  name: 'store',
  argType: 'string',
  withMultipleArguments : false,
  description: 'daily store of Items',
  callback: async (client, message, arguments) => {

      const {MessageEmbed} = require('discord.js');
        let {allDBS: {itemsDB, dailyStoreDB} } = require('../../index');
        const DailyDay = new Date()
        let entriesForEmbed;
      var StoreEmbed = new MessageEmbed()



    let { randomInt } = require("mathjs");

    let allItems = await new Promise((resolve, reject) => {
    itemsDB.find({}, function (err, docs) {
        resolve(docs);
        });
    });


    let databaseEmbed = await new Promise((resolve,reject)=>{

        dailyStoreDB.findOne({_id: 'embed'}, function(err, docs){

            resolve(docs.embed)
            
        })

    })


        
    StoreEmbed.setTitle(`✯ Daily Store for ${DailyDay.toLocaleDateString()} ✯`)
    StoreEmbed.setColor('#c12020')
    


    dailyStoreDB.find({day: DailyDay.getDay()}, async function(err, docs){

        if(docs.length < 1) {

          
            getItems()

            message.channel.send(StoreEmbed)

           dailyStoreDB.update({_id: "Day"}, {$set: {day: DailyDay.getDay()} } )    

           dailyStoreDB.update({'embed' : databaseEmbed}, {'embed' : StoreEmbed}, function(err, docs) {

            console.error(err)
            console.log(docs)

           })

           


 

        } else {

            console.log('still same day')

    

            
            databaseEmbed = new MessageEmbed(databaseEmbed)
        
            
            message.channel.send(databaseEmbed)

        }

    

    })

   



/*else {

    message.channel.send(StoreEmbed)

    dailyStore.set('Day', DailyDay.getDay())    

    console.log('Not same day')

    dailyStore.set('StoreEmbed', StoreEmbed)

    for(var i = 0; i < 6; i++) {
        dailyStore.set(`${i+1}`, storeArray[i].ID)
        
        }
   

    }

*/
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

    for(var i = 1; i < 7; i++) {

      entriesForEmbed = allItems[randomInt(0, allItems.length)];

       allItems = allItems.filter((item) => item._id !== entriesForEmbed._id);

       StoreEmbed.addField(`${i} : `,`${checkRarityOf(entriesForEmbed)} *${entriesForEmbed.title}* ⟹  \`${entriesForEmbed.value}\``, false)

    //    dailyStoreDB.update({_id: a}, function(err, docs){

    //        console.log(docs)

    //    })
       
       }



  }


  }



   



}


   










