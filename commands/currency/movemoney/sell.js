module.exports = {
  name: "sell",
  withMultipleArguments: true,
  argType: "flex",
  description: "Sell your items.",
  callback: async (client, message, args) => {
    const currency = require("../../../config.json");

    let {
      allDBS: { accountDB, itemsDB },
    } = require("../../../index");

    let [idInInventory = undefined, howMany = 1] = args;

    if (message.author.bot) return;

    if (isNaN(howMany)) return message.reply("Quantity was not a number.");

    if (idInInventory === undefined)
      return message.reply("No argument provided!");

    idInInventory = idInInventory.trimEnd();

    let hasAccount = await new Promise((resolve, reject) => {
      accountDB.findOne({ _id: message.author.id }, function (err, docs) {
        resolve(docs);
      });
    });

    if (hasAccount === null) {
      return message.reply("Please make an account with `tcp create`!");
    }

    let currentPossesions = await new Promise((resolve, reject) => {
      accountDB.findOne({ _id: message.author.id }, function (err, docs) {
        resolve({
          totalInHand: docs.balanceInHand,
          totalInBank: docs.balanceInBank,
          items: docs.Items,
        });
      });
    });

    let itemBeingSold = await new Promise((resolve, reject) => {
      itemsDB.findOne({ _id: idInInventory }, function (err, docs) {
        resolve(docs || null);
      });
    });

    if (itemBeingSold === null) {
      return message.reply("No item found.");
    }

    if (!currentPossesions.items.find((ids) => ids === itemBeingSold._id)) {
      return message.reply("You do not own this item!");
    }

    let sellingPrice = itemBeingSold.value * howMany;

    accountDB.update(
      { _id: message.author.id },
      { $pull: { Items: idInInventory } }
    );

    let allSimilar = () => {
      let countTotalItems = 0;

      for (let i = 0; i < currentPossesions.items.length; i++) {
        if (currentPossesions.items[i] === idInInventory) {
          countTotalItems++;
        }
      }

      return countTotalItems;
    };

    for (let i = 0; i < allSimilar() - howMany; i++) {
      accountDB.update(
        { _id: message.author.id },
        { $push: { Items: idInInventory } }
      );
    }

    accountDB.update(
      { _id: message.author.id },
      { $inc: { balanceInBank: sellingPrice } }
    );

    message.reply(
      `Added **${sellingPrice}** ${currency.currencyName} to your bank account and sold **${howMany}** **${idInInventory}**`
    );
  },
};
