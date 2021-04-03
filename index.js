const { Client } = require('discord.js')
const config = require('./config.json')

const Datastore = require('nedb')

const client = new Client({
    messageCacheMaxSize: 150,
    messageCacheLifetime: 300,
    messageSweepInterval: 10,
})

const allDBS = {
    accountDB: new Datastore('./databases/accounts'),
    itemsDB: new Datastore('./databases/items'),
    dailyStoreDB: new Datastore('./databases/daily_store'),
}

const {Payload, sern_handler} = require('sern_handler')

const payload = new Payload( 
{commands: '/commands',
owners: ['182326315813306369'],
prefix: 'tcp',
client: client}
)

const handler = new sern_handler(payload)
handler.displayOptions({
consoleCommands: true,
consoleRAM: true,
customMessage: "Logged in"
})

 
 allDBS.accountDB.loadDatabase()
 allDBS.itemsDB.loadDatabase()
 allDBS.dailyStoreDB.loadDatabase()



module.exports.allDBS = allDBS
client.login(config.token)
