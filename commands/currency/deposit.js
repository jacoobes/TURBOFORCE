
module.exports = {
    name: 'deposit',
    aliases: ['d'],
    argType: 'string',
    withMultipleArguments: true,
    description: 'Deposit money so you can use it.',
    callback: (client, message, arguments) => {
        
        const currency = require('../../config.json')
        const {accounts} = require('../../index')

        console.log(accounts.all())
        let totalInBank = accounts.get(`${message.author.id}.balanceInHand`)
        if(message.author.bot) return;
        if(accounts.get(`${message.author.id}`) === null) {message.reply('Please make an account with tcp create!');   }  
        if(arguments <  0) {message.reply('You cannot deposit a negative number!'); return;}
        if(accounts.get(`${message.author.id}.balanceInHand`) < arguments) {

            message.reply('You cannot deposit more than what you have in hand!');
            return;

        }

        if (arguments === 'all') { 

        accounts.subtract(`${message.author.id}.balanceIn
        Hand`, totalInBank)
        accounts.add(`${message.author.id}.balanceInBank`, totalInBank)

        message.reply(`Deposited ${arguments} ${currency.currencyName} from your account!`)

        } else { 

        accounts.subtract(`${message.author.id}.balanceInHand`, arguments);
        accounts.add(`${message.author.id}.balanceInBank`, arguments);

        message.reply(`Deposited ${arguments} ${currency.currencyName} from your account!`)

            }



                }




            }

 


    







