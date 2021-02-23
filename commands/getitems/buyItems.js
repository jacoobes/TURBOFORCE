module.exports = {
  name: "buy",
  aliases: ["b"],
  description: "buy items from the shop.",
  withMultipleArguments: true,
  argType: "number",
  callback: async (client, message, argument) => {

    let [index, quantity] = argument;

    quantity = quantity || 1;

    if (index < 0 || index > 5) {
      message.reply("Not a valid index!");
      return;
    }

    if (quantity < 0 || quantity > 10) {
      message.reply(
        "Cannot determine correct quantity wanted. Please use a number between 1 and 20."
      );
      return;
    }

    let {
      allDBS: { dailyStoreDB, itemsDB, accountDB },
    } = require("../../index");


    
    let hasAccount =  await new Promise((resolve, reject) => {accountDB.findOne({_id: message.author.id}, function(err,docs){
      resolve(docs)
  })
})

if(hasAccount === null){

  return message.reply('Please make an account with `tcp create`!')
}

    let itemRequested = await new Promise((resolve, reject) => {
      dailyStoreDB.findOne({ _id: "x1qSo8oXKktAHkhQ" }, function (err, docs) {
        resolve(docs.itemArray[index]);
      });
    });

    let item = await new Promise((resolve, reject) => {
      itemsDB.findOne({ _id: itemRequested }, function (err, docs) {
        resolve(docs);
      });
    });

    accountDB.findOne({ _id: message.author.id }, function (err, account) {
      if (account === null) {
        message.reply("Make an account with tcp create!");
        return;
      } else {
        let quantityXItem = getQuantity();
        let priceOfItem = item.value;
        let totalPrice = +priceOfItem * quantityXItem.length;

        if (account.balanceInHand < totalPrice) {
          message.reply("Please return with more money in hand. Thank you.");
          return;
        }

        accountDB.update(
          { _id: message.author.id },
          { $inc: { balanceInHand: 0 - totalPrice } }
        );
        accountDB.update(
          { _id: message.author.id },
          { $push: { Items: { $each: quantityXItem } } }
        );

        let { title, image } = item;
        let { MessageEmbed } = require("discord.js");
        let itemConfirmation = new MessageEmbed()

          .setTitle(`Purchase for ${quantity} ${title} was successful.`)
          .setColor(checkRarityOfItem(item))
          .setImage(image)
          .setDescription("Total Price Paid: " + totalPrice);

        message.channel.send(itemConfirmation);
      }
    });

    function checkRarityOfItem(itemsStored) {
      if (itemsStored.rarity === "uncommon") {
        return "#808080";
      } else if (itemsStored.rarity === "rare") {
        return "#5CFF5C";
      } else if (itemsStored.rarity === "legendary") {
        return "#c12020";
      } else if (itemsStored.rarity === "mystic") {
        return " #f7a537 ";
      }
    }

    function getQuantity() {
      let quantityXItem = [];
      if (quantity === 1) {
        quantityXItem.push(itemRequested);
      } else {
        for (var i = 0; i < quantity; i++) {
          quantityXItem.push(itemRequested);
        }
      }

      return quantityXItem;
    }
  },
};
