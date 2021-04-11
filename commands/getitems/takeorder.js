

module.exports = {
    name: 'order',
    description: 'Take the order of hungry customers to earn tip',
    aliases: ['or'],
    callback: async (client, message) => {
        const {
            allDBS: { accountDB },
        } = require('../../index')
        
        const {Account} = require('../../economyHandler')
       
        if(!Account({_id: message.author.id})) {

            message.reply("Please make an account with `tcp create`!")
        }

        const currency = require('../../config.json')

        let lotsOfRestaurants = [
            'Chik-fil-a',
            "Mc Donald's",
            "Cane's",
            'Panda Express',
            'Lotteria',
            "Arby's",
            'Burger King',
            'Krispy Kreme',
            'Five Guys',
            'Popeyes',
        ]

        let foods = [
            'Fried Chicken',
            'Orange Chicken',
            'Milk Shake',
            'French Fries',
            'Sprite',
            'Coca-Cola',
            'Oysters',
            'Hamburger',
            'Cheeseburger',
            'Glazed Doughnuts',
            'Chicken fingers',
            'Green beans',
            'Potatoes',
        ]

        let wrongAnswersOnly = [

            'you suck',
            'really bro?',
            'piece of garbage',
            'smelly poopy',
            'drip goku',
            'bingus with waves',
            'I hate noodles',
            'C\'mon man...'
        ]



        let randomElement = (array) => {
            return array[Math.floor(Math.random() * array.length)]
        }

        let randomRestaurant = randomElement(lotsOfRestaurants)

        let randomFood = randomElement(foods)

        let numberOfFoodsOrdered = Math.ceil(Math.random() * 6)

        let questions = [
            `Can I get **${numberOfFoodsOrdered} ${randomFood}** from ${randomRestaurant}.`,
            `I just want **${numberOfFoodsOrdered} ${randomFood}** from ${randomRestaurant}.`
        ]

        let answer = '';

        for(let i = 1; i <= numberOfFoodsOrdered + 1; i++){

            if(i === numberOfFoodsOrdered + 1) {

                answer += `${randomRestaurant} `

            } else {
            
            answer += `${randomFood} `

            }

        }   
        
        let reward = 10 + numberOfFoodsOrdered;
       //wrap in try-catch? 
        message.channel.send(`${randomElement(questions)}`)
       let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1})
        

       if(collected.first().content.trimEnd() === answer.trimEnd()){
        message.reply(`The order was made correctly! **${reward}** ${currency.currencyName} was wired to your bank account.`)

        accountDB.update({_id: message.author.id}, {$inc:{ balanceInBank: reward }})


       } else {

        message.reply(`The customer said "${randomElement(wrongAnswersOnly)}" and left, throwing your ${collected.first().content} on you.`)


       }

    },
}
