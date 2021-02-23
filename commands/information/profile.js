module.exports = {

    name: 'profile',
    aliases: ['p'],
    usesArguments: {
        argType: 'string',
        array: false,
    },
    description: "checks your own profile",
    callback: async (client, message, arguments) => {

        let {
            allDBS: {
                accountDB
            }
        } = require('../../index')
        let currency = require('../../config.json')

        let ecoAccount = await new Promise((resolve, reject) => {
            accountDB.findOne({
                _id: message.author.id
            }, function (err, docs) {

                resolve(docs || null)

            })
        })

        let totalMoney = ecoAccount.balanceInHand + ecoAccount.balanceInBank;

        var createdAt = message.author.createdAt.toDateString();
        const {
            MessageEmbed
        } = require('discord.js')

        const profileEmbed = new MessageEmbed()

            .setColor(message.member.displayHexColor)
            .setAuthor(`${message.author.username}'s profile `)
            .setFooter(`Account created on : ${createdAt}`)
            .setImage(message.author.avatarURL())
            .addField("Tag:", message.author.tag, true) //tag
            .addField('\u200B', '\u200B', true) //break 
            .addField("Boosted:", message.member.premiumSince === null ? "Not Boosting" : `Boosting since ${message.member.premiumSince}`, true)
            .addFields({
                name: 'Current Server:',
                value: message.guild.name,
                inline: true
            }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: "Joined:",
                value: message.member.joinedAt.toDateString(),
                inline: true
            }, {
                name: "Economy Status",
                value: ecoAccount == null ? `No account found.` : `${ecoAccount.Items.length} items | ${totalMoney} ${currency.currencyName}`,
                inline: 'false'
            })
            .setThumbnail(message.guild.iconURL());


        message.channel.send(profileEmbed);








    }






}