/**
 *
 * @param {String} arguments - Can take in an array or string. Returns Collection or Object of Collections
 */
const { message } = require(`./index`)
const {commandHandler} = require('./testNewHandler')
function getMentions(arguments) {
    
    const objectContainingMentions = {}
    let anyIDs = turnMentionIntoID(arguments)

    if (Array.isArray(arguments)) {
        let mentionMap = new Map()

        mentionMap = arguments.reduce((accumulator, currentValue, index) => {
            accumulator.set(
                currentValue,

                message.guild.members.cache.get(anyIDs[index]) ||
                    message.guild.roles.cache.get(anyIDs[index])
            )

            return accumulator
        }, mentionMap)

        for (var i = 0; i < arguments.length; i++) {
            objectContainingMentions[`mention${i}`] = mentionMap.get(arguments[i])

            objectContainingMentions[`mention${i}`] === undefined
                ? delete objectContainingMentions[`mention${i}`]
                : ''
        }

        return objectContainingMentions
    } else {
        return message.guild.members.cache.get(anyIDs) || message.guild.roles.cache.get(anyIDs)
    }
}

function turnMentionIntoID(arguments) {
    if (Array.isArray(arguments)) {
        let onlyUniques = [...new Set(arguments.map((mentions) => mentions))]

        onlyUniques = onlyUniques.reduce((accumulator, currentValue) => {
            currentValue = currentValue.replace(/[<>@!&]/g, '')
            accumulator.push(currentValue)

            return accumulator
        }, [])

        return onlyUniques
    } else {
        return (arguments = arguments.replace(/[<>@!&]/g, ''))
    }
}

/*
function oneOfOnly(oneOfThese = [], args = commandHandler.finalArgument()){
    console.log(oneOfThese)
if(Array.isArray(args)) {
    
for(let filterWords of oneOfThese){
    if(!args.some(word => word.includes(filterWords))){
       return message.reply(`Not one of the set arguments: ${oneOfThese.join(',')}`)
    }

    return;
} 

    

} else{
    
    message.reply('p')
}




}
*/
module.exports = {getMentions, oneOfOnly}
