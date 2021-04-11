module.exports = {
    name: "give",
    description: "Give money to someone",
    usesArguments: {
        argType: "string integer",
        array: true,
        validate: function (args = false) {
            return args > 0;
        },
        validateError: "Insufficient funds to give."
    },
    callback: function (payload, message, {argument}) {

        const {Account} = require("../../../economyHandler")
        const {allDBS: {accountDB}} = require('../../../index')
        
        let target = message.mentions.members.first().user

        if(!Account({_id: message.author.id})) {
            message.reply("Please create an account with `tcp create`!")
            return;
        }

        if(!Account({_id: target})) {
            message.reply("Please create an account with `tcp create`!")
            return
        }

        if(Account({_id: message.author.id}).balanceInHand < 0) {
            message.reply("Please come back with more money in hand")
            return;
        }

       accountDB.update({_id: target.id}, {$inc: {balanceInHand: +argument[1]}})
       accountDB.update({_id: message.author.id}, {$inc: {balanceInHand: 0 - argument[1]}})
        
        message.reply(`Success: Gave **${target.username}** ${argument[1]}`)
    }


}