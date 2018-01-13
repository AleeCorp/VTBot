const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const vtVersion = "1.0.0";
const prefix = "vt!";

function setGame() {
    var games = [
        "For help: vt!help",
		"QT Creator",
		"theShell",
		"VS Code"
    ]

    client.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            type: 0,
            name: games[Math.floor(Math.random() * games.length)]
        }
    })
}

client.on('ready', () => {
  console.log(`[STATUS] Bot is now ready!`);
  console.log(`[STATUS] Logged in as ${client.user.tag}!`);
  setGame();
  client.setInterval(setGame, 200000);
});

client.on('message', msg => {

    if (msg.content == prefix + 'help') {
        const embed = new Discord.RichEmbed();
        embed.setTitle('VTBot Help')
        embed.setDescription('Every command you put in this bot must start with `' + prefix + '`')
        embed.addField('- General Commands', 'ping', true)
         .setFooter("VTBot Copyright 2018. The version that VTBot's running is " + vtVersion + "!")
        embed.setColor("00C8FF")
        msg.channel.send({embed});
    }    

    if (msg.content == prefix + 'ping') {
        msg.reply(':warning: Pong!')
    }


});

client.login(config.token);