

const {handler} = require('../index')
module.exports = {

    listener: 'on',
    callback: async (payload) => {

        handler.displayOptions({
            consoleCommands: true,
            consoleEvents: true,
            consoleRAM: true,
            customMessage: "Logged in"
            })
        
    }

}