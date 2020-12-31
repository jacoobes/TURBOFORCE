

const { Client, MessageEmbed, Role, GuildMember} = require("discord.js");

//const client = new Client();

const config = require('./config.json')



const fs = require('fs');
const path = require('path');



const accounts = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/account.json`)
const itemsDataList = require(`C:/Users/jacob/OneDrive/Desktop/discord bot/itemsDataList.json`)
const Datastore = require('nedb')



const commando = require('discord.js-commando')
const client = new commando.CommandoClient({

    owner: '182326315813306368',
    commandPrefix: config.prefix

})


client.on('ready', async() => { 





var db = {} 

db.Items = new Datastore({filename: `items.db`, corruptAlertThreshold: 1})
db.Accounts = new Datastore({filename: `accounts.db`, corruptAlertThreshold: 1})


db.Items.loadDatabase(err => err? console.error(err + `items`) : "")
db.Accounts.loadDatabase(err =>err ? console.error(err + ` accounts`) : "")

module.exports.accountData = db.Accounts
module.exports.ItemData = db.Items
module.exports.db = db


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


