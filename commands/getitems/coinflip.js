
const {Argument} = require('sern_handler')

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    description: 'coinflip vs a person.',
    usesArguments: {
      array: true,
      argType: 'string number',
      validate: (args) => {
        return args[0]?.match(/^<@!?(\d+)>$/g)
      },
      validateError: 'First argument should mention someone, The second one should be a number.'
    },
    
    callback: async (payload, message, {argument}) => {
        
        
        if(argument.length < 0) return message.reply('Arguments required.')

        let [whoToWager, amountToWager] = argument

        if(!whoToWager.match(/^<@!?(\d+)>$/g)) return message.reply('First argument should mention someone, The second one should be a number.')
        
        let target = Argument.getMentions(whoToWager, message).member || Argument.getMentions(whoToWager, message).user;
        
        if(target.id === message.author.id) return message.reply('You cannot wager against yourself.')
  
        let { allDBS : {accountDB} } = require('../../index')

        let authorAccount =  await new Promise((resolve, reject) => {accountDB.findOne({_id: message.author.id}, function(err,docs){
            resolve(docs)
        })
      })
        let targetAccount = await new Promise((resolve, reject) => {accountDB.findOne({_id: target.id}, function(err,docs){
          resolve(docs)
      })
    })

  
      if(authorAccount == null || targetAccount == null) return message.reply('Either you or the person being targeted does not have an account.')
      
      if(amountToWager < 0) return message.reply('You cannot wager this number!')
      
      if(amountToWager > authorAccount.balanceInHand || amountToWager > targetAccount.balanceInHand) {

          return message.reply('Either you or the person being targeted does not have enough in hand to wager.')
      }
      
      
      let messageChooser = await message.channel.send(`Creating wager: Type \`heads\` or \`tails\` (case sensitive!)`)
      

      try {

      const filter = (msg => msg.content.toLowerCase() === 'heads' || msg.content.toLowerCase() === 'tails' && msg.author.id === message.author.id || msg.author.id === target.id)
      let messagesCollected = await messageChooser.channel.awaitMessages(filter, {max : 2, time: 20000})
     
         if(messagesCollected.array()[0].author.id === messagesCollected.array()[1].author.id)  {
            message.reply('You cannot wager both heads and tails! Canceled wager.');
            return;
          } 

          if(messagesCollected.array()[0].content === messagesCollected.array()[1].content) {
            message.reply('Both cannot wager the same side of the coin!')
            return;
          }

          let coinFlip = ['heads', 'tails']
         let winningChoice = coinFlip[Math.random(Math.round())]
            

      
      let [heads, tails] = messagesCollected.partition(msg=> msg.content === 'heads')

      if(heads.first().content === 'heads' && tails.first().content === 'tails') {

      let headsUser = heads.first().author
      let tailsUser = tails.first().author    

      if(heads.first().content === winningChoice) {
           
        message.channel.send(`${headsUser.username} wins.`)   
        message.channel.send(`\`${headsUser.username}\` > \`+${amountToWager * 2}\` \n \`${tailsUser.username}\` > \`-${amountToWager}\``)

          accountDB.update({_id: headsUser.id}, {$inc: {balanceInHand: amountToWager * 2}})

         accountDB.update({_id: tailsUser.id}, {$inc: {balanceInHand: 0 - amountToWager}})
         accountDB.update({_id: headsUser.id}, {$inc: {balanceInHand: 0 - amountToWager}})

       } else {
         
         message.channel.send(`${tailsUser.username} wins.`)
         message.channel.send(`\`${tailsUser.username}\` > +${amountToWager * 2} \n \`${headsUser.username}\` > \`-${amountToWager}\``)

          accountDB.update({_id: tailsUser.id}, {$inc: {balanceInHand: amountToWager * 2}})

         accountDB.update({_id: headsUser.id}, {$inc: {balanceInHand: 0 - amountToWager}})
         accountDB.update({_id: tailsUser.id}, {$inc: {balanceInHand: 0 - amountToWager}})
       }
    
      }
      }

      catch(e) {
        console.error(e)
        message.reply('Wager canceled')

      }
     
    

    }
    
    
}