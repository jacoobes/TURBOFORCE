
module.exports =  {

      name: 'urbandictionary',     
      aliases : ['ub', 'define'],
      withMultipleArguments : false,
      argType: 'string',
      description: 'random definition from Urban Dictionary!',
      callback: (client, message, arguments ) => {


        const {MessageEmbed} = require('discord.js')
        let {UBkey} = require('../../config.json')

        const axios = require("axios").default
        
      
      
          var options = {
            method: 'GET',
            url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
            params: {term: arguments},
            headers: {
              'x-rapidapi-key': UBkey,
              'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
            }
          };
        
        

         async function fetchCall() {
          
    
        let urbanDictionaryCall = await axios.request(options)

        return urbanDictionaryCall.data.list
        
          }

          fetchCall().then(data => {

            var i = Math.floor(Math.random() * data.length);
      
            var pages = data[i];
        
            const defWithOutBrackets = pages.definition.replace(/[\[\]']+/g,"");
            const exampleNoBracket = pages.example.replace(/[\[\]']+/g,"");
              
            const urbanDictionary = new MessageEmbed()
        
            .setColor(`#191970`)
        
            .setTitle(`${pages.word.toUpperCase()}: ` + `(${pages.permalink})`)
        
            .addField(`Definition ${i}`, defWithOutBrackets.length < 1024 ? defWithOutBrackets : `${defWithOutBrackets.substring(0,1017)}... `)
            .addField('Example: ', exampleNoBracket)
            .addField("Likes: ", `👍 ${pages.thumbs_up}`, true)
            .addField("Dislikes:", `👎 ${pages.thumbs_down}`, true)
            
        
            .setFooter(`Author: ${pages.author}`)
            //for each reaction, move the list to the next value
        
        
        message.channel.send(urbanDictionary);
  


           })
        
           
          }

      }
   


 

  

 




