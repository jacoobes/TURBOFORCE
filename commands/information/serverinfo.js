
module.exports =  {

            name : 'serverinfo',
            aliases: ['si'],
            description: "checks the server you are in",
            callback: async (client, message) => {


                const {MessageEmbed} = require('discord.js')
        
                   let arrayChannels = []
                   const ownerOfServer = await message.guild.members.fetch(message.guild.ownerID);     
                   let channels = await message.guild.channels.cache.map(chan => chan.type === 'text' || chan.type === 'voice'? arrayChannels.push(chan.name) : "");
                   const emotes = await message.guild.emojis.cache.map(emote => emote.id)
                   
                   var roles = await message.guild.roles.cache.array() 
                   
                   function randomizerRole(arg) {
                       
                        
        
                       arg.filter(element => !element.name.startsWith('══════ ◈') || !element.name === "-----------------------" )

                    let randomRole = arg[Math.round(Math.random() * arg.length)]

                       return randomRole
           
                          }   //implement a way to remove roles with ------------
                   
                       
                   // implement global emoji function
           
                   var cpEmotes = {
                       yukikopog: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_POGyukiko') || "",
                       plasticCry: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_PlasticLUL') || "",
                       jackieSmile: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_JackieSmile' ) || "",
                       yukiNaughty: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_YukiNaughty') || "",
                   }
        
                   //implement global emoji function
           
                   const serverWho = new MessageEmbed()
                   .setColor(' #a6f7e4 ')
                   .setTitle(message.guild.name)
                   .addFields(
                       {name:"Owner",value: `${cpEmotes.plasticCry}  ${ownerOfServer}`,inline: true},
                       {name:"Members", value: `${cpEmotes.yukiNaughty} ${message.guild.memberCount}`, inline: true},
                       {name:"Channels", value: `${cpEmotes.jackieSmile} ${arrayChannels.length}`, inline: true},        //optimize to show either voice or text
                       {name: "Boosted Level", value: message.guild.premiumTier, inline: true},
                       {name:`Emotes:`, value: `${cpEmotes.yukikopog}  ${emotes.length}`, inline: true},
                       {name: `Example Role`, value: randomizerRole(roles), inline: true}
                       
                       )
                   .setFooter(`Created: ${message.guild.createdAt.toDateString()}`)    
                   .setImage(message.guild.iconURL())
                   message.channel.send(serverWho);
                       
                       
                   
                   
       

                }






            }
        

       


           






