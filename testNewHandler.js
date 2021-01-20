


const commandHandler = ( () => {
  
const {readdirSync} = require('fs')
const {join, basename} = require('path')
const {Collection} = require('discord.js')
const { Client } = require('discord.js');
const chalk = require('chalk')



const client = new Client()

var commandCollection = new Collection()

  const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    
    let allFiles;
  
   
      var test = getDirectories('commands')
      
      for(var i = 0; i < test.length; i++) {
      
      
          let allFolders = join('commands', test[i])
          
        
        allFiles = readdirSync(`./`+allFolders)
                 
             for( var file of allFiles) {
             
              if(file.endsWith('.js')) {

            commandCollection.set(file , join(__dirname, allFolders, file))

              }

             }
              
    }



    
      

  return {
      
    getDirectory : function() {

       
    return commandCollection;
        


    },

    requireFiles : function () {
      
      for(let [key, value] of commandCollection) {

      console.log(require(value))

      }


    },

    eventLoad: function (f) {

      
      
      
    },

    consoleLog: function() {

      for(let [key, value] of commandCollection) {


        console.log('Registering ' + chalk.red(key) + '!')

      }
      
      



    }
   


  
  }
})();




module.exports.commandHandler = commandHandler 







