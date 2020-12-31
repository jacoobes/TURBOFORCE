
/*
const { Message } = require('discord.js')
const {prefix} = require('../config.json')  



const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
      ]
      for(const permission of permissions) {
          if (!validPermissions.includes(permission)) {
              throw new Error(`Unknown permissions node "${permission}"`)
          }
      }
}

module.exports = (client, commandOptions) => {

let {
    commands,
    expectedArgs = '',
    permissionError = 'You need more permissions to run this command',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback
    } = commandOptions

    //Ensure command and aliases are in an array

    if(typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}"`)

    //Ensure perms are in an array are valid
    if(permissions.length){
        if(typeof permissions === 'string'){
            permissions = [permissions]
        }
        validatePermissions(permissions)
    }

    //Listen for messages
    client.on('message', message =>{
        const {member, content, guild} = message

        for(const alias of commands) {

            if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                //command run

                //Ensure user has required permissions
                for(const permission of permissions) {
                    if(!member.hasPermission(permission)){
                        message.reply(permissionError)
                        return
                    }
                }
                //Ensure user has required roles

                for(const requiredRole of requiredRoles){
                    const role = guild.roles.cache.find(role => role.name === requiredRole)

                    if(!role || member.roles.cache.has(role.id)) {
                        message.reply(`You must have the "${requiredRole}" role to use this command.`)
                        return
                    }
                }
                //split number Spaces
                const arguments = content.split(/[ ]+/)

                //remove command in first index
                arguments.shift()
                console.log(arguments)
                //Ensure we have correct number of arguments
                if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                    message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`)
                    return
                }
                //Handle custom command code

                callback(message,arguments, arguments.join(' '))
                return 










                function transformMention(argumentsFromCmdHandler){

    var id;

    if(!isNaN(argumentsFromCmdHandler.charAt(argumentsFromCmdHandler.indexOf(`<`) + 2))){

      id = argumentsFromCmdHandler.slice(2, argumentsFromCmdHandler.length-1)  

      return id;

    } else {

     id = argumentsFromCmdHandler.slice(3 , argumentsFromCmdHandler.length-1);

     return id;
    }
 }
            }

        }

    })
}

*/