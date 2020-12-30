

/*
module.exports = {

    commands: ['freeItem'],
    expectedArgs: '',
    permissionError: 'You need more permissions to run this command',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text) =>
    
    {

        const listOfAllItemNames = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`)
        const accountList = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/account.json`)
        const fs = require('fs')



       var accountThatWantsFreeItem = accountList.allAccounts.find(user => message.author.id === user.userId);
       var randomFreeItem = listOfAllItemNames.allItems[Math.round(Math.random() * listOfAllItemNames.allItems.length)]

       
          
       if(accountThatWantsFreeItem === undefined) {message.reply('You need to make an account with tcp create!'); return; }
       if(accountThatWantsFreeItem.freeItem === true) {message.reply('You already got your free one item!'); return;}
       
       
       
       fs.readFile('C:/Users/jacob/OneDrive/Desktop/discord bot/account.json', 'utf8', function readFileCallback(err,data) {

            if(err){
                console.error(err)

            } else {
            
            
            
            var accountsArray = JSON.parse(data)

            console.log(accountsArray)

            var whoSentCommand = accountsArray.allAccounts.find(user => message.author.id === user.userId)

                whoSentCommand.Items.push(randomFreeItem)
                
                whoSentCommand.freeItem = true;

            var test = {
                
                allAccounts: accountsArray.allAccounts.map(obj => whoSentCommand === obj.id || obj)
             
            }
            console.log(test)

            test = JSON.stringify(test, null, 5)
           
            fs.writeFile('C:/Users/jacob/OneDrive/Desktop/discord bot/account.json', test, err =>{  console.error(err)} )

            }

            

        })
       
        message.reply(`You have received the free item: **${randomFreeItem.title}**, **MSRP**: ${randomFreeItem.value}, Rarity: **${randomFreeItem.rarity}** ${randomFreeItem.image}`)





    },
    permissions: [],
    requiredRoles: []
}

*/