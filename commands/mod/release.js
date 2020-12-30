/*

module.exports = {

    commands: ['release', 'r'],
    expectedArgs: '<mention>',
    permissionError: 'You need more permissions to run this command',
    minArgs: 0,
    maxArgs: 2,
    callback: (message, arguments, text) =>{
       
                
        if(message.author.bot) return;
           
            
            var args = arguments[1]

            if(arguments.length <= 1 || !args.startsWith(`<`)){

                message.reply("You need a id for this command.")

                return;

            }  else { 

                    var id = args.slice(3, args.length-1);

                    
        
                    let personFound = message.guild.members.cache.get(`${id}`)


                    let role = message.guild.roles.cache.get("704840632652398623")

            

                    if(personFound.roles.cache.has(role.id)){  
                
                      personFound.roles.remove(role) 
                      message.channel.send('wooshing..')
                    
                       
                
                         
                    } else{
                        message.reply("The targeted user is not muted.")
                    }
                
            }

           
            
        
        
            
        
    


       
    },
    permissions: ['KICK_MEMBERS'],
    requiredRoles: []
}

*/