
const {Client} = require("discord.js");
const config = require('./config.json')
const db = require('quick.db')
const {commandHandler} = require(`./testNewHandler`);
const chalk = require("chalk");
const Datastore = require('nedb')
const client = new Client({messageCacheMaxSize: 150, messageCacheLifetime: 300, messageSweepInterval: 10})
const allDBS = {
    accountDB : new Datastore('./databases/accounts'), 
    itemsDB : new Datastore('./databases/items'),
    dailyStoreDB : new Datastore('./databases/daily_store')
   }

client.on('ready', async() => { 


commandHandler.displayOptions({
    consoleCommands: true,
    consoleRAM: true,
    customMessage: chalk.whiteBright('TURBOFORCE logging in.')
})

 
 

var CityPopTerms = ["Mariya Takeuchi", "Meiko Nakahara", "Omega Tribe", "Momoko Kikuchi", "Tatsuro Yamashita", "Toshiki Kadomatsu", "City Pop", "Taku", "Plastic Love", "Junko Ohashi", "56709", "Piper", "Miki Matsubara", "Scramble Cross", "Minako Yoshida", "Hiromi Iwasaki", "Stay with Me", "Mao Music", "Casiopea", "Anri"];


var randomTerm = CityPopTerms[Math.floor(Math.random() * CityPopTerms.length)];

client.user.setActivity(`${randomTerm} | TURBOFORCE`, 



{type: "LISTENING"} )



allDBS.accountDB.loadDatabase()
allDBS.itemsDB.loadDatabase()
allDBS.dailyStoreDB.loadDatabase()
})


client.on('message', async (message) => {

    var items = new db.table('items')

    var accounts = new db.table('accounts')

    var dailyStore = new db.table('daily_store');
    
    module.exports = {items, accounts, dailyStore, message, allDBS};
    
    commandHandler.commandExecuter()




})




























client.login(config.token);


