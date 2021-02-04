
module.exports =  {

      name: 'create',
      description: 'intiate TURBOFORCE Currency Account!',
      withMultipleArguments: false,
      argType: 'string',     
      callback: (client, message, arguments) => {

       
      var {accounts} = require('../../index')

    

         
      var Account = {
            username: message.author.username,
            balanceInHand: 0,
            balanceInBank: 50,
            freeItem : false,
            Items: []
            } 


let hasAccount = accounts.fetch(message.author.id) || null
if(!hasAccount) { 

message.reply('Account created!')


accounts.set(message.author.id, Account)

} else {

message.reply("You already made an account!")

}












      }
    

  }

  

    

  




