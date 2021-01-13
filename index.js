
const { Client, MessageEmbed, Role, GuildMember} = require("discord.js");

//const client = new Client();

const config = require('./config.json')



const fs = require('fs');
const path = require('path');


const db = require('quick.db')



const commando = require('discord.js-commando')
const client = new commando.CommandoClient({

    owner: '182326315813306368',
    commandPrefix: config.prefix

})


client.once('ready', async() => { 




var items = new db.table('items')

var accounts = new db.table('accounts')

var dailyStore = new db.table('daily_store');

module.exports.items = items
module.exports.accounts = accounts
module.exports.dailyStore = dailyStore




console.log(`git client ready`)

client.registry


.registerGroups([

    ['currency', 'trading currency system'],
    [`fun`, `fun commands`],
    ['mod', 'moderation commands'],
    ['information', `basic information commands`],
    ['getitems', 'ways to get money and items!']

])
.registerDefaults()
.registerCommandsIn(path.join(__dirname, 'commands'))





var CityPopTerms = ["Mariya Takeuchi", "Meiko Nakahara", "Omega Tribe", "Momoko Kikuchi", "Tatsuro Yamashita", "Toshiki Kadomatsu", "City Pop", "Taku", "Plastic Love", "Junko Ohashi", "56709", "Piper", "Miki Matsubara", "Scramble Cross", "Minako Yoshida", "Hiromi Iwasaki", "Stay with Me", "Mao Music", "Casiopea", "Anri"];


var randomTerm = CityPopTerms[Math.floor(Math.random() * CityPopTerms.length)];

client.user.setActivity(`${randomTerm} | TURBOFORCE`, 



{type: "LISTENING"} )


})































client.login(config.token);


