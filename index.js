

const { Client, MessageEmbed, Role, GuildMember} = require("discord.js");

//const client = new Client();

const config = require('./config.json')



const fs = require('fs');
const path = require('path');

var Discogs = require('disconnect').Client;



const { EventEmitter } = require("events");



const commando = require('discord.js-commando')
const client = new commando.CommandoClient({

    owner: '182326315813306368',
    commandPrefix: config.prefix

})

client.on('ready', async() => { 

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

//var CityPopTerms = ["Mariya Takeuchi", "Meiko Nakahara", "Omega Tribe", "Momoko Kikuchi", "Tatsuro Yamashita", "Toshiki Kadomatsu", "City Pop", "Taku", "Plastic Love", "Junko Ohashi", "56709", "Piper", "Miki Matsubara", "Scramble Cross", "Minako Yoshida", "Hiromi Iwasaki", "Stay with Me", "Mao Music", "Casiopea", "Anri"];

   
/*
var randomTerm = CityPopTerms[Math.floor(Math.random() * CityPopTerms.length)];

client.user.setActivity(`${randomTerm} | TURBOFORCE`, 



{type: "LISTENING"} )





process.on('warning', e => console.warn(e.stack));
*/





})









/* 
client.once('ready' , async () => {
    console.log('Ready')
    const baseFile = 'command-handler.js'
    const commandBase = require(`./commands/${baseFile}`)
    
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))

        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname,dir,file))
            if(stat.isDirectory()){

                
                readCommands(path.join(dir,file))

            } else if( file !== baseFile){
                const options = require(path.join(__dirname, dir, file))
                
                console.log(options)
                commandBase(client, options)
            }
        }

    }
       
    readCommands('commands')

   */ 
    

       

        







 // setTimeout( () => userMap)
//set a watch for spam messages OR one message in many channels OR fishy links
//bring all those member(s) into 704831833321242784 (muted chat)
// staff can do thotpatrol to purge 
//post something to make it look cool




    

































client.login(config.token);


