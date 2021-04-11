
const {Argument} = require('sern_handler')

module.exports = {
  name: "test",
  description: "testing",
   usesArguments: {
     array: false,
     argType: 'string',
     validate : (arg) => {
        return arg === 'non'
     },
     validateError: 'no'
   },
  aliases: ["t"],
  ownerOnly: false,
  callback: async (payload, message, {argument, utils : {check}}) => {
    
    console.log(argument)
    
  },
};
