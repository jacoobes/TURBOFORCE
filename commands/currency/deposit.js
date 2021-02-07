module.exports = {
    name: 'deposit',
    aliases: ['d', 'dep'],
    argType: 'flex',
    withMultipleArguments: false,
    description: 'Deposit money so you can use it.',
    callback: async (client, message, args) => {
        const currency = require('../../config.json')
        let {
            allDBS: { accountDB, itemsDB, dailyStoreDB },
            accounts,
        } = require('../../index')

        let currentMoney = await new Promise((resolve, reject) => {
            accountDB.findOne({ _id: message.author.id }, function (err, docs) {
                resolve({
                    totalInHand: docs.balanceInHand,
                    totalInBank: docs.balanceInBank,
                })
            })
        })

        if (message.author.bot) return

        accountDB.find({}, function (err, docs) {
            if (docs === null) {
                message.reply('Please make an account with tcp create!')
                return
            }
        })

        if (args <= 0) {
            message.reply('You cannot deposit zero or a negative number!')
            return
        }

        if (currentMoney.totalInHand < args) {
            message.reply('You cannot deposit more than what you have in hand!')
            return
        }

        if (args === 'all') {
            accountDB.update({ _id: message.author.id }, { $inc: { balanceInBank: currentMoney.totalInHand } })

            accountDB.update({ _id: message.author.id }, { $set: { balanceInHand: 0 } })

            return message.reply(`Deposited ${args} ${currency.currencyName} from your account!`)
        } else {
            if (isNaN(args)) {
                return message.reply('Cannot do operation with argument: ' + args)
            }

            accountDB.update({ _id: message.author.id }, { $inc: { balanceInBank: parseInt(args) } })

            accountDB.update({ _id: message.author.id }, { $inc: { balanceInHand: 0 - parseInt(args) } })
        }

        message.reply(`Deposited ${args} ${currency.currencyName} from your account!`)
    },
}
