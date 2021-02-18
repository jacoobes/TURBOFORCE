


module.exports =  {
        name: 'ship',
        withMultipleArguments : true,
        argType: 'string',
        description: "Are you horny? You can ship two people. Just mention them.",
       callback: (client, message ,arguments) => {
            

        const { MessageEmbed} = require("discord.js");
        const shipGifs = require(`../../misc/ship.json`)
        const {getMentions} = require('../../utils')
        var axios = require("axios").default;
        let {rapidShipAPIkey} = require('../../config.json')
        let allMentions = getMentions(arguments)
             
        let firstName = allMentions.mention0.user
        let secondName= allMentions.mention1.user

        var optionsForLoveCalculator = {
          method: 'GET',
          url: 'https://love-calculator.p.rapidapi.com/getPercentage',
          params: {fname: firstName.username ,sname: secondName.username},
          headers: {
            'x-rapidapi-key': rapidShipAPIkey,
            'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
          }
        };
        
        
        
        
        axios.request(optionsForLoveCalculator).then(function (response) {
        
        const {percentage, result} = response.data;
        
         var shipEmbed = new MessageEmbed()   
        
            .setColor('#f57777')
        
            .setTitle(`❤️ How compatibile are ${firstName.username} and ${secondName.username}? ❤️ `)
        
            .addFields( 
                {name: firstName.tag, value: ` \n **Who** : ${firstName.bot? "Bot 🤖 " : "Real Person 🥰"} \n **Tag**: #${firstName.discriminator} \n **Nickname**: ${findGuildMemberNickname(firstName)}`, inline: true},
                
                {name: secondName.tag, value: ` \n **Who** : ${secondName.bot? "Bot 🤖" : "Real Person 🥰"} \n **Tag**: #${secondName.discriminator} \n **Nickname**: ${findGuildMemberNickname(secondName)}`, inline: true},
        
                {name: `**Percentage Compatibility: **`, value: percentage + "%", inline: false}
        
                )
            .setFooter(result)
            .setImage(sendGifInEmbed(percentage))
            
            
        
            message.channel.send("Analyzing...") 
        
            .then(msg => setTimeout(() => {
        
                msg.edit(`${firstName.avatarURL()}`)
        
                .then(msg => setTimeout(() => {
                    
                    msg.edit(`${secondName.avatarURL()}`)
        
                        .then(msg => setTimeout(() => {
                            
                            msg.edit(`Results:`)
        
                        }, 2000))
        
                }, 2000))
        
        
            }, 2000))
        
        
        
            .catch((err) => console.error(err))
        
            
        sendDelayedEmbed(shipEmbed)
        
    
        
        }).catch(function (axiosError) {
            console.error(axiosError);
        });
        
        
         
        //really need to start focusing on simplfying code
        
        
        
        
        
         function findGuildMemberNickname(user){
            
            return message.guild.members.cache.get(user.id).nickname === null || undefined ? "None 👎" : message.guild.members.cache.get(user.id).nickname
        
        }
        
        function sendDelayedEmbed(embed) {
            setTimeout(() => {
                
                message.channel.send(embed)
        
            }, 7000);
            
        }
        
        function sendGifInEmbed(percentage) {
        
            var shipGifsBreakup = Object.values(shipGifs.breakup)
        
            var shipGifsMiddle = Object.values(shipGifs.middle)
        
            var shipGifsLove = Object.values(shipGifs.love)
            
            var values, iterator;
        
            if(percentage <= 60) {
        
              values = Object.values(shipGifsBreakup)   
        
              iterator = Math.round(Math.random() * values.length)
              
               
              return shipGifsBreakup[iterator]
        
        
            } else if(percentage > 60 && percentage < 80) {
        
                values = Object.values(shipGifsMiddle)   
        
                iterator = Math.floor(Math.random() * values.length)
                
                return shipGifsMiddle[iterator]
        
        
        
        
            } else {
        
                values = Object.values(shipGifsLove)   
        
                iterator = Math.floor(Math.random() * values.length)
                
          
                return shipGifsLove[iterator]
        
            }
        
        
        
        
            
        
        
            }
        
        
        }
        
        
        
        
        
            }






        




/*


module.exports = {

    commands: ['ship'],
    expectedArgs: '<partner1> <partner2>',
    permissionError: 'You need more permissions to run this command',
    minArgs: 0,
    maxArgs: 3,
    callback: (message, arguments, text) =>{

        







    },
    permissions: [],
    requiredRoles: []
}

*/