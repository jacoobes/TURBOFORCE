
module.exports =  {

    name: 'freeitem',
    argType: 'string',
    withMultipleArguments: false,
    description: "Everyone gets one free item!",
    callback: (client, message, arguments) =>{ 

        var {accounts} = require(`../../index`)
        var {items} = require(`../../index`)

       
       
       var random = items.all()[Math.round(Math.random() * items.all().length)]

       var accountThatWantsFreeItem = `${message.author.id}.Items`

       var getRandomItem = items.get(random.ID)
       
      
     // accounts.set(accountThatWantsFreeItem, []) => total reset of Items!
       if(accounts.get(message.author.id) === null) {message.reply('You need to make an account with tcp create!'); return; }
       if(accounts.get(message.author.id).freeItem === true) {message.reply('You already got your free one item!'); return; }


       accounts.push(`${accountThatWantsFreeItem}`, getRandomItem)

       accounts.set(`${message.author.id}.freeItem`, true)

       message.reply(`You have received the free item: **${getRandomItem.title}**, **MSRP**: ${getRandomItem.value}, Rarity: **                    ${getRandomItem.rarity}** ${getRandomItem.image}`)




    }
    

}
