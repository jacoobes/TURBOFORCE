


module.exports = {

    commands: ['create'],
    expectedArgs: '<mention>',
    permissionError: 'You need more permissions to run this command',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text) =>{

      const fs = require(`fs`);

  var accountObj = {

    allAccounts : []

    }
    

checkForDuplicateAndCreateAccount()
  




function checkForDuplicateAndCreateAccount() {



  fs.readFile(`C:/Users/jacob/OneDrive/Desktop/discord bot/account.json`, 'utf8', function readFileCallback(err, data){


    var jsonOfAccounts = JSON.parse(data)


    if(searchForDuplicateID(jsonOfAccounts)){ 

      message.reply("You have already made your account.")
       
    } else {

      message.reply("Account created!")
  
      accountObj.allAccounts.push({
  
        userId : message.author.id,
        username: message.author.username,
        balanceInHand: 0,
        balanceInBank: 0,
        freeItem : false,
        Items: []

      })
  
  
      accountObj = JSON.stringify(accountObj,null,5)
  
     
      readingNewAccount(accountObj);
  
      
  
    }


  })

  
}





function readingNewAccount(jsonObj) {

  fs.readFile(`C:/Users/jacob/OneDrive/Desktop/discord bot/account.json`, 'utf8', function readFileCallback(err, data){
    if (err){

        console.log(err);

    } else {

    
      accountObj = JSON.parse(data); //now it an object
      accountObj.allAccounts.push({


        userId : message.author.id,
        username: message.author.username,
        balanceInHand: 0,
        balanceInBank: 0,
        freeItem : false,
        Items : []

          }); //add some data

    jsonObj = JSON.stringify(accountObj, null , 5); //convert it back to json

    writeNewAccountToJson(jsonObj)                                             // write it back 

}})




 }

 function writeNewAccountToJson(jsonObj){

  fs.writeFile('C:/Users/jacob/OneDrive/Desktop/discord bot/account.json', jsonObj, 'utf8',  function(err){

    if(err) { 
    console.log(err)
    }

  });

}



function searchForDuplicateID(dataOfJSON) {

  

  var hadID = dataOfJSON.allAccounts.some(elementOfArray => {


    return elementOfArray.userId === message.author.id


  })

return hadID

}
     
     
    },
    permissions: [],
    requiredRoles: []
}