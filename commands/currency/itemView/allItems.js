module.exports = {
    name: 'allitems',
    aliases: ['ai'],
    description: 'finds all item properties',
    usesArguments: {
        array: false,
        argType: 'string'
    },
    ownerOnly: true,
    callback: async (client, message, args) => {
        
        let {
            allDBS: { itemsDB},
        } = require('../../../index')
        var allItems = []

       

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
