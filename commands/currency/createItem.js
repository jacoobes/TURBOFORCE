module.exports = {
  name: "createitem",
  aliases: ["newitem", "ci", "ni"],
  description: "If an authorized user, you can create items for the currency system.",
  argType: "string",
  withMultipleArguments: false,
  callback: async (payload, message, {argument}) => {

    let {
      allDBS: {
        itemsDB,
      },
    } = require("../../index");

    const {
      MessageEmbed
    } = require(`discord.js`);

    if (isAuthorizedUser()) {
      {
        let itemValues = argument;
        itemValues = itemValues.replace(/ /g, "").split("|");

        let [title, value, description, rarity, imageLink] = itemValues;
        let id = title.toLowerCase().trim().replace(/-/g, "");
      
        let itemEmbed = new MessageEmbed();

        //if((!imageLink.match(/\.(jpeg|jpg|gif|png)$/) != null)) return message.reply('Not correct image format');
        itemEmbed.setTitle(replaceDashesWithSpacesFor(title));

        itemEmbed
          .addFields({
            name: `Value`,
            value: value,
            inline: false
          }, {
            name: `Description`,
            value: replaceDashesWithSpacesFor(description),
            inline: false,
          }, {
            name: `Rarity`,
            value: rarity,
            inline: false
          }, {
            name: `Image`,
            value: imageLink,
            inline: true
          }, {
            name: "Id",
            value: id,
            inline: false
          })

          .setImage(imageLink);

        message.channel.send(itemEmbed);

        message.channel.send("Do you want to create this item?");

        message.channel
          .awaitMessages((m) => m.author.id == message.author.id, {
            max: 1,
            time: 15000,
          })
          .then((collected) => {
            if (collected.first().content.toLowerCase() == "yes") {

              var objectToBeSent = {
                title: replaceDashesWithSpacesFor(title),
                value: value,
                description: replaceDashesWithSpacesFor(description),
                rarity: rarity,
                image: imageLink,
                _id: replaceDashesWithSpacesFor(id).replace(/ /g, "")
              };

              itemsDB.insert(objectToBeSent, function confirmation(err, docs) {

                message.reply('Item made successfully.')
              })
            } else message.reply("Operation canceled.");
          })
          .catch(() => {
            message.reply("No answer after 7 seconds, operation canceled.");
          });
      }
    } else {
      message.channel.send("You cannot use this command!");
    }

    function isAuthorizedUser() {
      return (
        message.author.id === `182326315813306368` ||
        message.author.id === "304386631719452682" ||
        message.author.id === "383101377347584012"
      );
    }

    function replaceDashesWithSpacesFor(string) {
      string = string.replace(/-/g, " ");

      return string;
    }
  },
};