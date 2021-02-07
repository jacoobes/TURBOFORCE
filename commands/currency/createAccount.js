module.exports = {
    name: 'create',
    description: 'intiate TURBOFORCE Currency Account!',
    withMultipleArguments: false,
    argType: 'string',
    callback: (client, message, arguments) => {
        var {
            allDBS: { accountDB },
        } = require('../../index')

        var Account = {
            _id: message.author.id,
            username: message.author.username,
            balanceInHand: 0,
            balanceInBank: 50,
            freeItem: false,
            Items: [],
        }

        accountDB.insert(Account, function (err, docs) {
            if (err) {
                console.error(err)
                message.reply('You already made an account!')
            } else {
                message.reply('Account created!')
            }
        })
    },
}
