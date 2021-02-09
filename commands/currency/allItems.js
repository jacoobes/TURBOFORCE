module.exports = {
    name: 'allitems',
    aliases: ['ai'],
    description: 'finds all item properties',
    withMultipleArguments: false,
    argType: 'string',
    callback: async (client, message, args) => {
        

        

        let {
            allDBS: { itemsDB},
        } = require('../../index')
        var allItems = []

        /*
        let {title, value, description, rarity, image} = items.get(b.ID)
        let item = {
            title: title,
            value: value,
            description: description,
            rarity: rarity,
            image: image,
            _id: title.toLowerCase().replace(/ /g, "")
        }

    */

        itemsDB.find({}, function (err, docs) {
            allItems = docs
            let messageToPost = ''

            for (let item of allItems) {
                if (item[args] === undefined) return message.reply('Search query not detected!')

                messageToPost += ` <**${item[args]}**> `
            }

            message.channel.send(messageToPost)
        })
    },
}
