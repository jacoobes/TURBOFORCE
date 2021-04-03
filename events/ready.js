

const {handler} = require('../index')
module.exports = {

    listener: 'on',
    callback: async (payload) => {

        handler.displayOptions({
            consoleRAM: true,
            consoleCommands: true,
            customMessage: 'TURBOFORCE logging in.',
        })
    
        
        
    }

}