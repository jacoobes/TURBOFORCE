const { MessageEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const { db } = require('../../index.js');


module.exports = class createAccount extends commando.Command {


  constructor(client) {

    super(client, {

      name: 'create',     
      group: 'currency',
      memberName: 'create',
      description: 'intiate TURBOFORCE Currency Account!',

    })

  }

  async run(message) {

    var {accounts} = require('../../index')
    const {MessageEmbed} = require('discord.js')
    
//will export embed from myAccount.js to here 
         
var Account = {
            username: message.author.username,
            balanceInHand: 0,
            balanceInBank: 50,
            freeItem : false,
            Items: []
            } 

if(accounts.fetch(message.author.id) === null) { 

message.reply('Account created!')

const {accountEmbed} = require('./myAccount')

message.channel.send(accountEmbed)



accounts.set(message.author.id, Account)

} else {

message.reply("You already made an account!")

}




function getAllItems() {

  var yourAccount = accounts.get(`${message.author.id}.Items`)
  
  var yourPossessions = yourAccount.Items
  
  
  for (yourPossessions of yourAccount) {
  
  return `**${yourPossessions.title}** (${yourPossessions.value}) \n` 
  
          }
  
  
      }





  }


}

