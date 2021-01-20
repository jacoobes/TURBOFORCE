        const commando = require('discord.js-commando')

    module.exports = class bringFunction extends commando.Command {

        constructor(client) {

            super(client, {

                name: 'bring',
                aliases: ['b'],
                group: 'mod',
                memberName: 'bring',
                description: "A quick way to silence a member without much commotion",
                userPermissions: ["KICK_MEMBERS"],
                args:[

                    {
                        key: 'members',
                        prompt: 'who wants to be muted',
                        type:'member'
                    }


                ],
                argsType: 'multiple',
                argsCount: 2
            })


        }


        async run(message, {members}) {

            console.log(members)

            if(message.author.bot) return;
            
                var stringArray = args.split(/(\s+)/);
    

                stringArray = stringArray.filter(function(str) {
                    return /\S/.test(str)
                })

            stringArray.forEach(userId => {

                console.log(userId)

                if(!userId.startsWith(`<@!`) || !isNaN(userId.charAt(userId.indexOf(`<`) + 2))) {

                    message.reply("You need a id for this command.")
                    return;

                } else { 



                    var id = userId.slice(3, userId.length-1);
    
                    let personFoundFromId = message.guild.members.cache.get(id)
    
    
                    let mutedRole = message.guild.roles.cache.get("704831833321242784")
    
            
                personFoundFromId.roles.cache.has(mutedRole.id) 
                
                ? message.reply("The targeted user is already muted.")
                
                : personFoundFromId.roles.add(mutedRole) 
                
                
                
               
    
                message.reply('wooshing...')
    
                .then(msg => msg.delete({timeout: 1000}))





                }

                
            });
                


                


            function isNumeric(str) {
                if (typeof str != "string") return false // we only process strings!  
               return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                       !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail


        }


    }

}