module.exports = {

name: 'test',
description: 'testing',
withMultipleArguments : true, 
argType : 'string',
aliases: ['t'],
userPermissions : ['KICK_MEMBERS'],
callback : (client, message, arguments) => {

    const getMentions = require('../../mentions')
    
    console.log(getMentions(arguments))


    }
}