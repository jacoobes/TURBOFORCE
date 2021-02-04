

module.exports =  {

           name: 'allitems',     
           aliases : ['ai'],
           description: 'finds all item properties',
           withMultipleArguments : true, 
           argType : 'string',
           callback: (client, message, arguments) => {

            let {items} = require(`../../index`)

           
            
                if(message.author.bot) return;

                    var messageToPost = "";

                for (var itemsStored of items.fetchAll()) {

                var eachItem = items.get(itemsStored.ID) 


                messageToPost += `**${itemsStored.ID}** : ${eachItem[item_value]}, `

                }   
                
            
                
                
                
                message.channel.send(messageToPost, {split : true})
                
                    





    }



}

