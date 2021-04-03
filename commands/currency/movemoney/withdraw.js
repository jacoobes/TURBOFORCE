
module.exports =  {
    
    name: 'withdraw',
    aliases: ['w', 'with'],
    usesArguments: {
        array: false,
        argType: 'number',
    },
    description: 'Withdraw money so you can use it.',

    callback: async (client, message, {argument}) => {

        const currency = require('../../../config.json')
        let { allDBS : {accountDB} } = require('../../../index')

        let hasAccount =  await new Promise((resolve, reject) => {accountDB.findOne({_id: message.author.id}, function(err,docs){
            resolve(docs)
        })
      })
    
      if(hasAccount === null){
    
        return message.reply('Please make an account with `tcp create`!')
      }



        let currentMoney = await new Promise((resolve, reject) => { accountDB.findOne({_id: message.author.id}, function(err, docs) {

            resolve({totalInHand: docs.balanceInHand , totalInBank: docs.balanceInBank} )

        }) }) 

        
        
        if(message.author.bot) return;

        accountDB.find({}, function(err, docs) {

        if(docs === null) {message.reply('Please make an account with tcp create!'); return;}

        })

        if(argument <=  0) {message.reply('You cannot withdraw zero or a negative number!'); return;}

        if(currentMoney.totalInBank < argument) {

            message.reply('You cannot withdraw more than what you have in hand!');
            return;

        }

        

        if (argument === 'all') { 

        accountDB.update({_id: message.author.id}, {$inc : {balanceInHand : currentMoney.totalInBank  }})

        accountDB.update({_id: message.author.id}, {$set : {balanceInBank : 0 }})

       
        return  message.reply(`Withdrew ${argument} ${currency.currencyName} from your account!`)

        } else { 
            if(isNaN(argument)) {

                return message.reply('Cannot do operation with argument: ' + argument)

            }

       accountDB.update({_id: message.author.id}, {$inc : {balanceInHand: parseInt(argument)}})

       accountDB.update({_id: message.author.id}, {$inc: {balanceInBank : 0 - parseInt(argument)}})
        

            }


            message.reply(`Withdrew ${argument} ${currency.currencyName} from your account!`)

        }
            


                // var totalInBank = accounts.get(`${message.author.id}.balanceInBank`)
                // if(message.author.bot) return;
                // if(accounts.get(`${message.author.id}`) === null) {message.reply('Please make an account with tcp create!');   }  
                // if(money <  0) {message.reply('You cannot withdraw a negative number!'); return;}
                // if(accounts.get(`${message.author.id}.balanceInBank`) < money) {

                //     message.reply('You cannot withdraw more than what you have!');
                //     return;

                // }

                // if (money === 'all') { 

                // accounts.subtract(`${message.author.id}.balanceInBank`, totalInBank)
                // accounts.add(`${message.author.id}.balanceInHand`, totalInBank)

                // message.reply(`Withdrew ${money} ${currency.currencyName} from your account!`)

                // } else { 

                // accounts.subtract(`${message.author.id}.balanceInBank`, money);
                // accounts.add(`${message.author.id}.balanceInHand`, money);

                // message.reply(`Withdrew ${money} ${currency.currencyName} from your account!`)

}














    

   