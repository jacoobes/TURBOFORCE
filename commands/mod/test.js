module.exports = {
    name: 'test',
    description: 'testing',
    withMultipleArguments: true,
    argType: 'string',
    aliases: ['t'],
    callback: (client, message, arguments) => {
        const {getMentions} = require('../../mentions')
        const {oneOfOnly} = require('../../mentions')
        let {
            allDBS: { accountDB, itemsDB, dailyStoreDB },
        } = require('../../index')
        const { accounts, dailyStore } = require('../../index')
        
        oneOfOnly(['chicken', 'loodle'])
        message.reply('noodle')

        // accountDB.update({ _id: message.author.id }, { $set: { balanceInBank: 180 } })

        // accountDB.update({ _id: message.author.id }, { $set: { balanceInHand: 0 } })

       
    },
}
