/*


module.exports = class releaseCommand extends commando.Command {


    constructor(client) {

        super(client, {

            name: 'release',
            aliases: ['r'],
            group: 'mod',
            memberName: 'release',
            examples: ['tcp release <mention>', 'tcp r <mention>'],
            description: "Releasing members from muted channel.",
            userPermissions: ["KICK_MEMBERS"],





        })




    }

async run(message, args) {

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


        })

    }
    
}

*/