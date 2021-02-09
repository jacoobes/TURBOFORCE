module.exports = {
  name: "test",
  description: "testing",
  withMultipleArguments: true,
  argType: "string",
  aliases: ["t"],
  callback: async (client, message, arguments) => {
    const { getMentions } = require("../../mentions");

    let {
      allDBS: { accountDB, itemsDB, dailyStoreDB },
    } = require("../../index");
    const { accounts, dailyStore } = require("../../index");

    let { randomInt } = require("mathjs");

    let databaseEmbed = await new Promise((resolve,reject)=>{

      dailyStoreDB.findOne({_id: 'embed'}, function(err, docs){

          resolve(docs.embed)
          
      })

  })


  dailyStoreDB.find({_id: {$nin : ['embed', 'Day'] } }, function(err, docs) {

   console.log(docs)


   })

    
  },
};
