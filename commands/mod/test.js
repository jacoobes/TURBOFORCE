
const {Argument} = require('sern_handler')

module.exports = {
  name: "test",
  description: "testing",
   usesArguments: {
     array: false,
     argType: 'string',
   },
  aliases: ["t"],
  ownerOnly: false,
  callback: async (payload, message, {argument, utils : {check}}) => {
    
    let f = check(message)[3]
    console.log(f('791343546497105941'))
    
  },
};
