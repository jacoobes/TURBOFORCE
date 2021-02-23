

module.exports = {
  name: "test",
  description: "testing",
   usesArguments: {
     array: false,
     argType: 'flex',
   },
  aliases: ["t"],
  userPermissions: ['PRIORITY_SPEAKER'],
  callback: async (client, message, argument) => {
  
    console.log(argument)
   

  },
};
