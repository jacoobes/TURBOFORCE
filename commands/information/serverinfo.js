
/*
module.exports = {

    commands: ['si', 'serverinfo'],
    expectedArgs: '',
    permissionError: 'You need more permissions to run this command',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text) =>{
        const {MessageEmbed} = require('discord.js')


        


        
        async function serv() {

           var arrayChannels = []
           const ownerOfServer = await message.guild.members.fetch(message.guild.ownerID);     
           var channels = await message.guild.channels.cache.map(chan => chan.type === 'text' || chan.type === 'voice'? arrayChannels.push(chan.name) : "");
           const emotes = await message.guild.emojis.cache.map(emote => emote.id)
           
           var roles = await message.guild.roles.cache.array() 
              
           





           
           
           
           function randomRole(arg) {
               
                var randomRole;

               var i = Math.round(Math.random() * arg.length)
   
               arg.forEach((el) => {
   
                   if(el[i] === undefined || el[i].name.toString().startsWith('══════ ◈') || el[i] === "-----------------------" ) 
                   
                   {
                       randomRole = arg[i+1]       
        
                   } else {
   
                       randomRole = arg[i];
                   }
        
               })            
   
               return randomRole
   
                  }   //implement a way to remove roles with ------------
           
               
           
   
           var cpEmotes = {
               yukikopog: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_POGyukiko'),
               plasticCry: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_PlasticLUL'),
               jackieSmile: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_JackieSmile' ),
               yukiNaughty: message.guild.emojis.cache.find(emotes => emotes.name === 'tcpop_YukiNaughty'),
           }
   
           const serverWho = new MessageEmbed()
           .setColor(' #a6f7e4 ')
           .setTitle(message.guild.name)
           .addFields(
               {name:"Owner",value: `${cpEmotes.plasticCry}  ${ownerOfServer}`,inline: true},
               {name:"Members", value: `${cpEmotes.yukiNaughty} ${message.guild.memberCount}`, inline: true},
               {name:"Channels", value: `${cpEmotes.jackieSmile} ${arrayChannels.length}`, inline: true},        //optimize to show either voice or text
               {name: "Boosted Level", value: message.guild.premiumTier, inline: true},
               {name:`Emotes:`, value: `${cpEmotes.yukikopog}  ${emotes.length}`, inline: true},
               {name: `Example Role`, value: randomRole(roles), inline: true}
               
               )
           .setFooter(`Created: ${message.guild.createdAt.toDateString()}`)    
           .setImage(message.guild.iconURL())
           message.channel.send(serverWho);
               
               
           
           
   
           
   
           }
           
           serv();


    },
    permissions: [],
    requiredRoles: []
}

*/