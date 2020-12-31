const commando = require('discord.js-commando')



module.exports = class urbanDictionary extends commando.Command {


  constructor(client) {

    super(client, {

      name: 'urbandictionary',     
      aliases : ['ub', 'define'],
      group: 'fun',
      memberName: 'urbandictionary',
      description: 'random definition from Urban Dictionary!'

    })


  }

async run(message,searchTerm) {

  const {MessageEmbed} = require('discord.js')
        

  const axios = require("axios").default
  


    var options = {
      method: 'GET',
      url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
      params: {term: `${searchTerm}`},
      headers: {
        'x-rapidapi-key': 'c3337957e4mshd354f1938a4c3b3p15669ajsn8ac3b80b3cb2',
        'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
      }
    };
  
    

    axios.request(options)
    
    
    .then(async function (response) {

    var i = Math.floor(Math.random() * response.data.list.length);

    var pages = response.data.list[i];

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
    
    .catch(function (error) {
        message.reply("Definition not found")
        console.error(error)
    });




}





}
