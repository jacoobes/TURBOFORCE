/*
const {create, all, simplify, random, randomInt} = require('mathjs');
const {accounts} = require('../../index')
const symbol = require ('../../config.json')
const {MessageEmbed} = require('discord.js')


module.exports = class SolveMath extends commando.Command {


constructor(client) {

    

        name: 'solve',
        aliases: ['s'],
        group: 'getitems',
        memberName: 'solve',
        examples: ['tcp solve'],
        description: "Solve a math problem to earn some money. Keep your mind sharp!",
        args : [
            {
                key: 'difficulty',
                prompt:'How hard will the problem be?',
                type:'string',
                oneOf:['easy', 'medium', 'hard']
        }


        ]

    })




}

async run(message, {difficulty}) {

var mathEmbed = new MessageEmbed();

const config = {

matrix: 'Array'

}
var LengthOfProblem, expression = [], aRandomOp, reward, finalMathProblem, timeToSolve;


const math = create(all, config)
var ops = ['+', '-', '*', '/']

var goodMessages = [

`Nice.`,
'Good stuff.',
'You passed.',
'Smart guy.',
'Do you play League?',
'You reek of sweat.',
'LETS GOOOO!',
'Albert Einstein daddy?'

]

var badMessages = [

'Really? :(',
`C'mon man..`,
'Lmao dude..',
'Nice try, person',
'moans 😩.',
'Honestly....',
'Bro?',
`I'm gonna kill you...`,
'You smell like cheese.',
'You poo poo.'

]

const filter = (m => m.author.id === message.author.id)


if(difficulty == 'easy') {

    ops = ops.slice(0,2)

    LengthOfProblem = 3;

    aRandomOp = randomOp()

    createExpression()

    reward = randomInt(10,30)

    timeToSolve = 5000
    
} else if ( difficulty == 'medium') {

    ops = ops.slice(0,3)

    LengthOfProblem = 5;

    
    aRandomOp = randomOp();

    createExpression()

    reward = randomInt(30,50)

    timeToSolve = 10000

} else {

    LengthOfProblem = 7;
    
    aRandomOp = randomOp();

    createExpression()

    reward = randomInt(51, 70)

    timeToSolve = 15000
}

finalMathProblem = makeMathProblemToObject()

mathEmbed.setTitle('Make sure to round!')
mathEmbed.addFields(
    {name: 'Problem:', value: `||${finalMathProblem.problem}||`, inline: true },
    {name: 'Time:', value: `${finalMathProblem.timeout / 1000} seconds`, inline: true  },

    )

message.channel.send(mathEmbed)

message.channel.awaitMessages(filter, {max: 1, time: finalMathProblem.timeout})


.then(collected => {



if(parseInt(collected.first().content) === finalMathProblem.answer) {

    message.reply(finalMathProblem.correctMessage)


    accounts.get(`${message.author.id}`) === null ? 
    
    message.reply(`You need to create an account with **tcp create**!`)

    : 
    
     
    accounts.add(`${message.author.id}.balanceInBank`, finalMathProblem.reward)

} else {

    message.reply(finalMathProblem.wrongMessage)

}




}) .catch( () => {message.reply('You did not solve in time!')})











function randomOp(arr = ops) {

    return arr[Math.round(random(0,arr.length-1))]

    }

function randomNum() {

    return randomInt(1,20)

}

function createExpression() {
    
    for(var i = 0; i < LengthOfProblem; i++){

        if(i % 2 == 0) {
            expression.push(randomNum())
    
        } else {
    
            expression.push(randomOp())
    
            }
    
    
        }

}

function makeMathProblemToObject() {

    expression = expression.toString()
    expression = expression.replaceAll(/,/g, " ")

    return {

    difficulty: difficulty,
    reward: reward,
    problem: expression,
    answer: Math.round(math.evaluate(expression)),
    correctMessage: randomOp(goodMessages) + ` You were deposited ${reward} ${symbol.currencyName}`,
    wrongMessage: randomOp(badMessages),
    timeout: timeToSolve

        }
    }



    }
}






*/

