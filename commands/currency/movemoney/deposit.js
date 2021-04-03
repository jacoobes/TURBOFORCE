
module.exports = {
    name: 'deposit',
    aliases: ['d', 'dep'],
    usesArguments: {
        array: false,
        argType: 'flex',
    },
    description: 'Deposit money so you can use it.',
    callback: async (payload, message, {argument}) => {

        const currency = require('../../../config.json')
        let {
            allDBS: { accountDB },
            
        } = require('../../../index')

        let currentMoney = await new Promise((resolve) => {
            accountDB.findOne({ _id: message.author.id }, function (err, docs) {
                resolve({
                    totalInHand: docs.balanceInHand,
                    totalInBank: docs.balanceInBank,
                })
            })
        })

        if (message.author.bot) return
        
        let hasAccount =  await new Promise((resolve, reject) => {accountDB.findOne({_id: message.author.id}, function(err,docs){
            resolve(docs)
        })
      })
    
      if(hasAccount === null){
            message.reply('Please make an account with `tcp create`!')
            return
      }

        if (argument <= 0) {
            message.reply('You cannot deposit zero or a negative number!')
            return
        }

        if (currentMoney.totalInHand < argument) {
            message.reply('You cannot deposit more than what you have in hand!')
            return
        }

        if (argument === 'all') {
            accountDB.update({ _id: message.author.id }, { $inc: { balanceInBank: currentMoney.totalInHand } })

            accountDB.update({ _id: message.author.id }, { $set: { balanceInHand: 0 } })

            return message.reply(`Deposited ${argument} ${currency.currencyName} from your account!`)
        } else {
            if (isNaN(argument)) {
                return message.reply('Cannot do operation with argument: ' + argument)
            }

            accountDB.update({ _id: message.author.id }, { $inc: { balanceInBank: parseInt(argument) } })

            accountDB.update({ _id: message.author.id }, { $inc: { balanceInHand: 0 - parseInt(argument) } })
        }

        message.reply(`Deposited ${argument} ${currency.currencyName} from your account!`)
    },
}
