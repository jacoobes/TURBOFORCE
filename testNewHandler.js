const commandHandler = (() => {
    const { Client, Message } = require('discord.js')
    const chalk = require('chalk')
    const glob = require('glob')
    let commandCollection = new Map()
    let aliasCollection = new Map()
    var fileCollection = []

    var getDirectories = function (src, callback) {
        return glob(src + '/**/*', callback)
    }

    getDirectories('./commands', function (err, res) {
        if (err) {
            console.log('Error', err)
            return
        }

        fileCollection = res
            .map((element) => (element.endsWith('js') ? element : undefined))
            .filter(Boolean)

        for (let module of fileCollection) {
            let moduleObj = require(module)

            commandCollection = commandCollection.set(moduleObj.name, require(module))

            for (let module of fileCollection) {
                let moduleObj = require(module)
                if (moduleObj.aliases === undefined) {
                    ;('')
                } else {
                    moduleObj.aliases.forEach((name) => {
                        aliasCollection = aliasCollection.set(name, require(module))
                    })
                }
            }
        }
    })

    return {

        throwIfPossibleUnkown: function(thingtoCheck){
            let {message} = this.commandInfo()
            if(thingtoCheck === null || thingtoCheck === undefined){

                 message.reply('Unknown command detected.')

            }
            return;

        },
        commandInfo: function () {
            let { message } = require('./index')
            let messageEmitted = message.content.split(/\s+/g)

            let commandInfo = {
                message: message,
                argument: messageEmitted,
            }

            return commandInfo
        },

        /**
         *
         * @param {Object} wantsLog - Options to customize console output
         * @param {boolean} wantsLog.consoleCommands - Outputs all detected commands
         * @param {boolean} wantsLog.consoleRAM - Outputs RAM usage
         * @param {string}  wantsLog.customMessage - Option to output custom message
         */

        displayOptions: function (
            wantsLog = { consoleCommands: false, consoleRAM: false, customMessage: false }
        ) {
            if (wantsLog.consoleCommands) {
                let commandTable = {}
                for (let [key, value] of commandCollection) {
                    value.description === undefined
                        ? (value.description = ``)
                        : (commandTable[key] = value.description)
                }
                console.log(chalk.bold.redBright('Registering:'))
                console.table(commandTable)
            }

            if (wantsLog.consoleRAM) {
                const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10]
                arr.reverse()
                const used = process.memoryUsage()
                let memoryToMegaBytes = []
                let keys = []

                for (let key in used) {
                    memoryToMegaBytes.push(Math.round((used[key] / 1024 / 1024) * 100) / 100)
                    keys.push(key)
                }

                let tableOfMemory = keys.reduce((accumulator, currentValue, index) => {
                    accumulator[currentValue] = memoryToMegaBytes[index] + 'MBs'

                    return accumulator
                }, {})

                console.table(tableOfMemory)
            }

            if (wantsLog.customMessage) {
                console.log(wantsLog.customMessage)
            }
        },

        eventLoad: function () {
            let allCommandEmittables = {
                command: commandCollection,
                aliases: aliasCollection,
            }

            return allCommandEmittables
        },
        /**
         * Executes all commands
         */
        commandExecuter: function () {
            let commandName = this.commandInfo()
            let { command, aliases } = this.eventLoad()
            let config = require(`./config.json`)
            let arrayOfMessage = commandName.argument.join(' ')
            const client = new Client()

            if (arrayOfMessage.startsWith(config.prefix)) {
                let messageEmitted =
                    aliases.get(commandName.argument[1]) ||
                    command.get(commandName.argument[1]) ||
                    null

                   this.throwIfPossibleUnkown(messageEmitted); 

                try {
                    if (this.hasUserPermissions()) {
                        messageEmitted.callback(client, commandName.message, this.finalArgument())
                    }
                } catch (e) {
                    console.error(e)
    
                }
            }
        },
        argCount: function () {
            let commandInfo = this.commandInfo()
            let { command, aliases } = this.eventLoad()
            let messageEmitted = commandInfo.argument
            let name = messageEmitted[1]

            command = command.get(name) || aliases.get(name) || null

            this.throwIfPossibleUnkown(command);

            if (command.withMultipleArguments) {
                return messageEmitted.slice(2)
            } else {
                return messageEmitted.splice(2).join(' ')
            }
        },

        finalArgument: function () {
            let { command, aliases } = this.eventLoad()
            let { message, argument } = this.commandInfo()
            let name = argument[1]

            command = command.get(name) || aliases.get(name) || null

            let desiredType = command.argType.toLowerCase()

            let typeOfArgument = new Map()

            typeOfArgument.set('string', String)
            typeOfArgument.set('boolean', Boolean)
            typeOfArgument.set('number', Number)
            typeOfArgument.set('array', Array)
            typeOfArgument.set('map', Map)
            typeOfArgument.set('set', Set)
            typeOfArgument.set('flex', 'flex')

            let statTypedArgument = this.argCount()

            if (command.argType.toLowerCase() === typeOfArgument.get('flex')) {
                return statTypedArgument
            } else {
                desiredType = typeOfArgument.get(desiredType)

                if (command.withMultipleArguments) {
                    return (statTypedArgument = statTypedArgument.map(
                        (el) => (el = desiredType(el))
                    ))
                } else {
                    return (statTypedArgument = new desiredType(statTypedArgument))
                }
            }
        },
        hasUserPermissions: function () {
            let { command, aliases } = this.eventLoad()
            let { message, argument } = this.commandInfo()

            let { member } = message
            let messageEmitted = argument
            let name = messageEmitted[1]

            command = command.get(name) || aliases.get(name) || null
            
            if (message.member.permissions.has('ADMINISTRATOR')) {
                return true
            }
            else if (!command.userPermissions) {
                return true
            } else {
                const allValidPermissions = [
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
                for (let aPermission of allValidPermissions) {
                    if (!member.permissions.has(aPermission)) {
                        message.reply(
                            `You do not have the correct permissions to use ${command.name}`
                        )
                        return
                    }
                }
            }
        },
    }
})()



module.exports.commandHandler = commandHandler
