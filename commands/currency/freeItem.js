module.exports = {
  name: "freeitem",
  argType: "string",
  withMultipleArguments: false,
  description: "Everyone gets one free item!",
  callback: async (client, message, arguments) => {
    const { randomInt } = require("mathjs");


    let hasAccount =  await new Promise((resolve, reject) => {accountDB.findOne({_id: message.author.id}, function(err,docs){
      resolve(docs)
  })
})

if(hasAccount === null){

  return message.reply('Please make an account with `tcp create`!')
}

    let {
      allDBS: { accountDB, itemsDB },
    } = require("../../index");

    let accountThatWantsFreeItem = await new Promise((resolve, reject) => {
      accountDB.findOne({ _id: message.author.id }, function (err, docs) {
        resolve(docs);

      
      });
    });

    if (accountThatWantsFreeItem.freeItem === true) {
      message.reply("You already got your free one item!");
      return;
    } else {
      let randomItem = await new Promise((resolve, reject) => {
        itemsDB.find({}, function (err, docs) {
          resolve(docs[randomInt(0, docs.length)]);
        });
      });

      accountDB.update(
        { _id: message.author.id },
        { $set: { freeItem: true } }
      );
      accountDB.update(
        { _id: message.author.id },
        { $push: { Items: randomItem._id } }
      );

      message.reply(
        `You have received the free item: **${randomItem.title}**, **MSRP**: ${randomItem.value}, Rarity: **${randomItem.rarity}** ${randomItem.image}`
      );
    }
  },
};
