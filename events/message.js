

const {handler} = require('../index')
const {Argument} = require('sern_handler')


module.exports = {
    listener: 'on',
    callback: async (payload, message) => {
        
     
        if(handler.isNotValidMessage(message)) return;

        let command = await handler.fetchEmittedCommand(message)

        if (command.ownerOnly) {
            if (!payload.data.owners.includes(message.author.id)) {
                return message.reply(command.notOwnerError);
            }
        }

        if(command.usesArguments) {

            let {
                usesArguments: {
                    argType = 'string',  //required if using arguments
                    array = false,       //required if using arguments!
                    validate,
                    typeError,
                    validateError = "Arguments did not pass the test",
                    noArgumentsError = 'Please provide arguments',
                    
                }
            } = command

            let argument = new Argument(handler.formatMessage(message), array, argType, validate)
            argument.setArray()

            if(argument.type !== argType) {
                return message.reply("Incorrect Types!") 
            }

        return command.callback(payload, message, argument)
    }
        return command.callback(payload, message)

    }

}