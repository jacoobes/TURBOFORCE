        
        /*
        const {Command} = require('advanced-command-handler');
        module.exports = new Command(
            {
                name: 'bring',
                description: 'mute people', // Optionnals :
                usage: 'tcp bring <mention>',
                category: '',
                tags: [],
                aliases: ['b'],
                userPermissions: ['KICK_MEMBERS'],
                clientPermissions: [],
                cooldown: 10,
            } /* Note :
             You can now put the args you want as this handler
             doesn't have default a message event. 
        
             ,
            async (client, message, args) => {


                console.log(args)

                if(message.author.bot) return;
           
            
                var argsOfCmdHandler = args[1]
                


                if(args.length <= 1 || !argsOfCmdHandler.startsWith(`<`)){

                    message.reply("You need a id for this command.")
                    return;

                } else { 

                    var id = argsOfCmdHandler.slice(3, argsOfCmdHandler.length-1);
        
                    let personFoundFromId = message.guild.members.cache.get(id)


                    let mutedRole = message.guild.roles.cache.get("704840632652398623")

            
                personFoundFromId.roles.cache.has(mutedRole.id) 
                
                ? message.reply("The targeted user is already muted.")
                
                : personFoundFromId.roles.add(mutedRole) 
                
                
                
               

                message.reply('wooshing...')

                .then(msg => msg.delete({timeout: 1000}))

                

                

                }   


                
            }
        );
            

        

     */  
   