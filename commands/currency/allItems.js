

module.exports =  {

           name: 'allitems',     
           aliases : ['ai'],
           description: 'finds all item properties',
           withMultipleArguments : true, 
           argType : 'string',
           callback: (client, message, arguments) => {

            let {items} = require(`../../index`)
            let{allDBS : {accountDB, itemsDB, dailyStoreDB } } = require('../../index')
          
            
            for (var itemsStored of items.fetchAll()) {

                var eachItem = items.get(itemsStored.ID)
                
                

               //messageToPost += `**${itemsStored.ID}** : ${eachItem[item_value]}, `

                }   



                function randomId(){

                    var id = ""
                    var isAddingNumbers = 0
            
                    while(isAddingNumbers <= 12){
            
                        var randomNumber = Math.round(Math.random() * 12)
            
                        id += randomNumber
            
                        isAddingNumbers++
                    }
            
                    return id;
        
            }




            /*
                if(message.author.bot) return;

                    var messageToPost = "";

                for (var itemsStored of items.fetchAll()) {

                var eachItem = items.get(itemsStored.ID) 


                messageToPost += `**${itemsStored.ID}** : ${eachItem[item_value]}, `

                }   
                
            
                
                
                
                message.channel.send(messageToPost, {split : true})
                
                    
*/




    }



}

