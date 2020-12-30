






/*
module.exports = {

    commands: ['allItems', 'aI'],
    expectedArgs: '<property of item>',
    permissionError: 'You need more permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
         
        
    const listOfAllItemNames = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`)
                
    var argumentOne = arguments[1]
    var keysOfObj = []
    

    



        
if(isAuthorizedUser()) {
//find way to use this, i think its not reading the value of the key of objects
    listOfAllItemNames.allItems.forEach(object => {

        return keysOfObj = Object.keys(object)
        
        
 

    })

    
if(isNotValidKey()) return;

    //find way to solve

    
    var itemsFromFile = listOfAllItemNames
    var messageToPost = "";


    itemsFromFile.allItems.forEach(arrayElement =>{

    messageToPost += arrayElement[argumentOne] + ", \n"

})




message.channel.send(messageToPost)

    

}         
        
                
function isAuthorizedUser() {

    if(message.author.id === `182326315813306368` || message.author.id === '304386631719452682' || message.author.id === '383101377347584012' ) return true

    else message.reply("Not an authorized user"); return false;

   }        
   
   
function isNotValidKey() {

    var oneOfTheKeys = keysOfObj.find(el => el === argumentOne)

    if(oneOfTheKeys === undefined) {
      message.reply('Not a proper parameter.')

      return true;

    }
     return;
      }

           

        
        
            
        
    


       
    },
    permissions: [],
    requiredRoles: []
}

*/