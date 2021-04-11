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

const {Payload,CustomEventHandler} = require('sern_handler')

const payload = new Payload( 
{commands: '/commands',
events: '/events',
owners: ['182326315813306369'],
prefix: 'tcp',
client: client}
)

const handler = new CustomEventHandler(payload, true);



module.exports.handler = handler
 
 allDBS.accountDB.loadDatabase()
 allDBS.itemsDB.loadDatabase()
 allDBS.dailyStoreDB.loadDatabase()



module.exports.allDBS = allDBS
client.login(config.token)
