module.exports = {
  name: "account",
  aliases: ["acc", "balance", "bal"],
  description: "your account",
  callback: async (client, message) => {
    const {
      MessageEmbed
    } = require("discord.js");
    const {
      allDBS: {
        accountDB
      },
    } = require("../../../index");

    let hasAccount = await new Promise((resolve, reject) => {
      accountDB.findOne({
        _id: message.author.id
      }, function (err, docs) {
        resolve(docs)
      })
    })

    if (hasAccount === null) {

      return message.reply('Please make an account with `tcp create`!')
    }



    let accountStats = await new Promise((resolve, reject) => {
      accountDB.findOne({
        _id: message.author.id
      }, function (err, docs) {
        resolve({
          totalInHand: docs.balanceInHand,
          totalInBank: docs.balanceInBank,
          items: docs.Items,
        });
      });
    });

    var accountEmbed = new MessageEmbed()

      .setColor(message.member.displayHexColor)
      .setTitle(`♣︎ ${message.author.username}'s account ♣︎`)
      .addFields({
          name: "Balance in Hand",
          value: accountStats.totalInHand,
          inline: true,
        },

        {
          name: "Balance in Bank",
          value: accountStats.totalInBank,
          inline: true,
        }
      )

      .setThumbnail(message.author.avatarURL());

    getAllItemsForEmbed();

    message.channel.send(accountEmbed || 'Use `tcp myitems`');

    function getAllItemsForEmbed() {
      var yourItems = accountStats.items;
      let stringOfAllItems = "";

      let uniqueEntries;
      if (yourItems.length < 1) {
        return accountEmbed.addField("Items", "No Items");
      } else {
        uniqueEntries = [...new Set(yourItems.map((item) => item))];
        yourItems.sort();

        for (var i = 0; i < uniqueEntries.length; i++) {
          let countOfSameItem = 0;

          for (var item of yourItems) {
            if (item === uniqueEntries[i]) {
              countOfSameItem++;
            }
          }

          stringOfAllItems += `**${countOfSameItem}** ${uniqueEntries[i]} \n`;
        }
        accountEmbed.addField("Items", stringOfAllItems);
      }
    }
  },
};