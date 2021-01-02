

const { Client, MessageEmbed, Role, GuildMember} = require("discord.js");

//const client = new Client();

const config = require('./config.json')



const fs = require('fs');
const path = require('path');



//onst accounts = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/account.json`)
const itemsDataList = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`)
const db = require('quick.db')



const commando = require('discord.js-commando')
const client = new commando.CommandoClient({

    owner: '182326315813306368',
    commandPrefix: config.prefix

})


client.once('ready', async() => { 




var items = new db.table('items')

var accounts = new db.table('accounts')

module.exports.items = items
module.exports.accounts = accounts





console.log(`git client ready`)

client.registry


.registerGroups([

    ['currency', 'trading currency system'],
    [`fun`, `fun commands`],
    ['mod', 'moderation commands'],
    ['information', `basic information commands`]

])
.registerDefaults()
.registerCommandsIn(path.join(__dirname, 'commands'))





var CityPopTerms = ["Mariya Takeuchi", "Meiko Nakahara", "Omega Tribe", "Momoko Kikuchi", "Tatsuro Yamashita", "Toshiki Kadomatsu", "City Pop", "Taku", "Plastic Love", "Junko Ohashi", "56709", "Piper", "Miki Matsubara", "Scramble Cross", "Minako Yoshida", "Hiromi Iwasaki", "Stay with Me", "Mao Music", "Casiopea", "Anri"];


var randomTerm = CityPopTerms[Math.floor(Math.random() * CityPopTerms.length)];

client.user.setActivity(`${randomTerm} | TURBOFORCE`, 



{type: "LISTENING"} )

















})































client.login(config.token);


