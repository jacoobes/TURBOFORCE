
module.exports = {

            name: 'profile',
            aliases: ['p'],
            argType: 'string',
            withMultipleArguments: false,
            description: "checks your own profile",
            callback: (client, message, arguments) => {

                let {allDBS: {accountDB}} = require('../../index')
                async function hasAccount(){

                    let hasEcoAccount = await new Promise((resolve, reject)=> {

                        

                    })

                }
                console.log(message.content)
                var createdAt = message.author.createdAt.toDateString();
                const {MessageEmbed} = require('discord.js')

                const profileEmbed = new MessageEmbed()
                
                .setColor(message.member.displayHexColor)
                .setAuthor(`${message.author.username}'s profile `)
                .setFooter(`Account created on : ${createdAt}`)
                .setImage(message.author.avatarURL())
                .addField("Tag:", message.author.tag, true) //tag
                .addField('\u200B', '\u200B', true) //break 
                .addField("Boosted:", message.member.premiumSince === null ? "Not Boosting" : `Boosting since ${message.member.premiumSince}`, true)
                .addFields(
                    {name: 'Current Server:', value: message.guild.name, inline:true},
                    {name: '\u200B', value : '\u200B', inline:true},
                    {name: "Joined:", value: message.member.joinedAt.toDateString(), inline: true},
                    {name: "Joined", value: 'lorem ipsum', inline: 'false' })
                .setThumbnail(message.guild.iconURL());
                

                message.channel.send(profileEmbed); 








            }
    
  

   

       
   } 



