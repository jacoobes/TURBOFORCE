
const {Command} = require('advanced-command-handler');

module.exports = new Command(
	{
		name: 'profile',
		description: 'brings up your profile',
		// Optionnals :
		usage: 'tcp profile',
		aliases: ['p'],
		cooldown: 10,
	} /* Note :
     You can put what arguments you want as this handler
     doesn't have a default message event.
     */,
	async (client, message, args) => {

        
        message.channel.send('hello')

        

        var createdAt = message.author.createdAt.toDateString();
        const {MessageEmbed} = require('discord.js')

        const profileEmbed = new MessageEmbed()
        
        .setColor(message.member.displayHexColor)
        .setAuthor(`${message.author.username}'s profile `)
        .setFooter(`Account created on : ${createdAt}`)
        .setImage(message.author.avatarURL())
        .addField("Tag:", message.author.tag, true) //tag
        .addField('\u200B', '\u200B', true) //break 
        .addField("Boosted:", message.member.premiumSince === null ? "Not Boosting" : `Boosting since ${message.member.premiumSince}`, true)
        .addFields(
            {name: 'Current Server:', value: message.guild.name, inline:true},
            {name: '\u200B', value : '\u200B', inline:true},
            {name: "Joined:", value: message.member.joinedAt.toDateString(), inline: true} //help
        )
        .setThumbnail(message.guild.iconURL());
        

        message.channel.send(profileEmbed); 
        // Your code goes here.
        
	}
);