module.exports = {
  name: "solve",
  aliases: ["s"],
  usesArguments: {
    argType: "string",
    array: false,
  },
  description: "Solve a math problem to earn some money. Keep your mind sharp!",
  callback: async  (client, message, {argument}) => {
    const { create, all, random, randomInt } = require("mathjs");
    const symbol = require("../../config.json");
    const { MessageEmbed } = require("discord.js");
    const {allDBS: {accountDB}} = require('../../index')
    let difficulty = argument.trim().toLowerCase();
    
   let hasAccount =  await new Promise((resolve) => {accountDB.findOne({_id: message.author.id}, function(err,docs){
        resolve(docs)
    })
  })

  if(hasAccount === null){

    return message.reply('Please make an account with `tcp create`!')
  }
  
    var mathEmbed = new MessageEmbed();

    const config = {
      matrix: "Array",
    };
    var LengthOfProblem,
      expression = [],
      reward,
      finalMathProblem,
      timeToSolve;

    const math = create(all, config);
    var ops = ["+", "-", "*", "/"];

    var goodMessages = [
      `Nice.`,
      "Good stuff.",
      "You passed.",
      "Smart guy.",
      "Do you play League?",
      "You reek of sweat.",
      "LETS GOOOO!",
      "Albert Einstein daddy?",
    ];

    var badMessages = [
      "Really? :(",
      `C'mon man..`,
      "Lmao dude..",
      "Nice try, person",
      "moans 😩.",
      "Honestly....",
      "Bro?",
      `I'm gonna kill you...`,
      "You smell like cheese.",
      "You poo poo.",
    ];

    const filter = (m) => m.author.id === message.author.id;

    if (difficulty == "easy") {
      ops = ops.slice(0, 2);

      LengthOfProblem = 3;

      aRandomOp = randomOp();

      createExpression();

      reward = randomInt(10, 30);

      timeToSolve = 5000;
    } else if (difficulty == "medium") {
      ops = ops.slice(0, 3);

      LengthOfProblem = 5;

      aRandomOp = randomOp();

      createExpression();

      reward = randomInt(30, 50);

      timeToSolve = 10000;
    } else if(difficulty == 'hard'){
      LengthOfProblem = 7;

      aRandomOp = randomOp();

      createExpression();

      reward = randomInt(51, 70);

      timeToSolve = 20000;
    } else {

        return message.reply('Please use easy, medium, or hard.')

    }

    finalMathProblem = makeMathProblemToObject();

    mathEmbed.setTitle("Make sure to round the final answer!");
    mathEmbed.addFields(
      {
        name: "Problem:",
        value: `||${finalMathProblem.problem}||`,
        inline: true,
      },
      {
        name: "Time:",
        value: `${finalMathProblem.timeout / 1000} seconds`,
        inline: true,
      }
    );

    message.channel.send(mathEmbed);

    message.channel
      .awaitMessages(filter, { max: 1, time: finalMathProblem.timeout })

      .then((collected) => {
        if (parseInt(collected.first().content) === finalMathProblem.answer) {
          message.reply(finalMathProblem.correctMessage);

          accountDB.update({_id: message.author.id}, {$inc: {balanceInBank: finalMathProblem.reward}}) 

        } else {
          message.reply(finalMathProblem.wrongMessage);
        }
      })
      .catch(() => {
        message.reply("You did not solve in time!" + ` Correct answer: ${finalMathProblem.answer}`);
      });

    function randomOp(arr = ops) {
      return arr[Math.round(random(0, arr.length - 1))];
    }

    function randomNum() {
      return randomInt(1, 20);
    }

    function createExpression() {
      for (var i = 0; i < LengthOfProblem; i++) {
        if (i % 2 == 0) {
          expression.push(randomNum());
        } else {
          expression.push(randomOp());
        }
      }
    }

    function makeMathProblemToObject() {
      expression = expression.toString();
      expression = expression.replaceAll(/,/g, " ");

      return {
        difficulty: difficulty,
        reward: reward,
        problem: expression,
        answer: Math.round(math.evaluate(expression)),
        correctMessage:
          randomOp(goodMessages) +
          ` You were deposited ${reward} ${symbol.currencyName}`,
        wrongMessage: randomOp(badMessages),
        timeout: timeToSolve,
      };
    }
  },
};
