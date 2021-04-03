module.exports = {

    name: 'myitems',     
    aliases : ['mi'],
    description: 'shows all items',
    callback: async  (client, message) =>{

        const paginationEmbed = require('discord.js-pagination');
        const {MessageEmbed} = require('discord.js')
        const {allDBS:{accountDB, itemsDB}} = require('../../../index')


        let account = await new Promise((resolve, reject) => {
            accountDB.findOne({ _id: message.author.id }, function (err, docs) {
              resolve(docs);
            })
        })

        

        //if account is not found, it is null
            if(account === null){
                return message.reply('Please make an account with \`tcp create\`');

            } else {
               
                let accountItems = account.Items; //array

                
                var messageEmbedArray = [];
                for(var i = 0; i < accountItems.length; i++){
                    var messageStuff = new MessageEmbed() 
                    let yourItem = await new Promise((resolve, reject) => {

                        itemsDB.findOne({_id: accountItems[i]}, function(err, docs) {

                            resolve(docs)

                        })
            
                    })

                    let {title, value, description, rarity, image} = yourItem

                    messageStuff.setTitle(title)
                    messageStuff.addFields(
                        {name: 'Value: ', value: value, inline: true},
                        {name: 'Rarity: ', value: rarity, inline: true})
                    messageStuff.setColor(checkRarityOfItem(rarity))
                    messageStuff.setImage(image)
                    messageStuff.setDescription(description)

                    messageEmbedArray.push(messageStuff)
                }

                messageEmbedArray.length < 1 ? message.channel.send('Nothing found!') : paginationEmbed(message, messageEmbedArray)
                
        
            
                }

                function checkRarityOfItem(rarity) {

                    if(rarity === 'uncommon') {
            
                        return '#808080'
            
            
                    } else if (rarity === 'rare') {
            
            
                        return '#5CFF5C'
            
                    } else if(rarity === 'legendary') {
            
            
                        return '#c12020'
            
                    } else if(rarity === 'mystic') {
            
                        return ' #f7a537 '
            
                    }



                
            }


            //Objects


       
    }

}