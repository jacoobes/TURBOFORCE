

module.exports = {
    name: 'order',
    description: 'Take the order of hungry customers to earn tip',
    aliases: ['or'],
    withMultipleArguments: false,
    argType: 'string',
    callback: async (client, message, args) => {
        const {
            allDBS: { accountDB, itemDB },
        } = require('../../index')

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

        let randomElement = (array) => {
            return array[Math.ceil(Math.random() * array.length)]
        }

        let randomRestaurant = randomElement(lotsOfRestaurants)

        let randomFood = randomElement(foods)

        let numberOfFoodsOrdered = Math.ceil(Math.random() * 6)

        let questions = [
            `Can I get **${numberOfFoodsOrdered} ${randomFood}** from ${randomRestaurant}.`,
            `I just want **${numberOfFoodsOrdered} ${randomFood}** from ${randomRestaurant}.`
        ]

        let answer = '';

        for(let i = 1; i < numberOfFoodsOrdered; i++){

            if(i === 6) {

                answer += `${randomRestaurant} `

            } else {
            
            answer += `${randomFood} `

            }

        }    
        
        message.channel.send(`${randomElement(questions)}`)
       let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1})
        
       if(collected.first().content === answer){
        console.log('solved correctly')

       } else{
        console.log(answer)
        console.log('wrong')
       }

    },
}
