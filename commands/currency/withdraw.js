/*
var {accounts} = require(`../../index`)
var currency = require('../../config.json')

module.exports = class Withdraw extends commando.Command {

    constructor(client) {

        super(client, {

            name: 'withdraw',
            aliases: ['w'],
            group: 'currency',
            memberName: 'withdraw',
            description: 'Withdraw money so you can use it.',
            examples: [`tcp withdraw 100`],
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
var totalInBank = accounts.get(`${message.author.id}.balanceInBank`)
if(message.author.bot) return;
if(accounts.get(`${message.author.id}`) === null) {message.reply('Please make an account with tcp create!');   }  
if(money <  0) {message.reply('You cannot withdraw a negative number!'); return;}
if(accounts.get(`${message.author.id}.balanceInBank`) < money) {

    message.reply('You cannot withdraw more than what you have!');
    return;

}

if (money === 'all') { 

accounts.subtract(`${message.author.id}.balanceInBank`, totalInBank)
accounts.add(`${message.author.id}.balanceInHand`, totalInBank)

message.reply(`Withdrew ${money} ${currency.currencyName} from your account!`)

} else { 

accounts.subtract(`${message.author.id}.balanceInBank`, money);
accounts.add(`${message.author.id}.balanceInHand`, money);

message.reply(`Withdrew ${money} ${currency.currencyName} from your account!`)

}
}


}



*/