const commando = require(`discord.js-commando`);
var {accounts} = require(`../../index`)
var currency = require('../../config.json')

module.exports = class Deposit extends commando.Command {

    constructor(client) {

        super(client, {

            name: 'deposit',
            aliases: ['d'],
            group: 'currency',
            memberName: 'deposit',
            description: 'Deposit money so you can use it.',
            examples: [`tcp deposit 100`],
            args: [
                {
                    key: 'money',
                    prompt: 'How much would you like to deposit?',
                    type: 'string',
                    default: 'all'
                },

            ],

        })


    }

    async run(message, {money}){

let totalInBank = accounts.get(`${message.author.id}.balanceInHand`)
if(message.author.bot) return;
if(accounts.get(`${message.author.id}`) === null) {message.reply('Please make an account with tcp create!');   }  
if(money <  0) {message.reply('You cannot deposit a negative number!'); return;}
if(accounts.get(`${message.author.id}.balanceInHand`) < money) {

    message.reply('You cannot deposit more than what you have!');
    return;

}

if (money === 'all') { 

accounts.subtract(`${message.author.id}.balanceIn
Hand`, totalInBank)
accounts.add(`${message.author.id}.balanceInBank`, totalInBank)

message.reply(`Deposited ${money} ${currency.currencyName} from your account!`)

} else { 

accounts.subtract(`${message.author.id}.balanceInHand`, money);
accounts.add(`${message.author.id}.balanceInBank`, money);

message.reply(`Deposited ${money} ${currency.currencyName} from your account!`)

}
}


}



