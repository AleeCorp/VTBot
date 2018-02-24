const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const readline = require('readline');
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
  console.log(`Welcome to VTBot Terminal!`)
  console.log(`[STATUS] Bot is now ready!`);
  console.log(`[STATUS] Logged in as ${client.user.tag}!`);
  console.log(`[STATUS] Prefix: ` + prefix)
  console.log(`[STATUS] Token: ` + config.token)
  setGame();
  client.setInterval(setGame, 200000);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'VTBot> '
  });
  
  rl.prompt();
  
  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'help':
        console.log('VTBot Terminal Help:\nhelp\nexit');
        break;
      case 'exit':
        console.log("[STATUS] Exiting VTBot...")
        process.exit(0);
      default:
        console.log(`[ERROR] Unknown command: ${line.trim()}`);
        break;
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
  });
  
});

client.on('message', msg => {

    if (msg.mentions != null && msg.mentions.users != null) {
        if (msg.mentions.users.has("401491921865801728")){
                if (msg.content.toLowerCase().includes("hello") || (msg.content.toLowerCase().includes("hi"))) {
                    msg.reply("Hi there.");
            } else {
                if (msg.content.toLowerCase().includes("shut") && msg.content.toLowerCase().includes("up")) {
                msg.reply("Excuse me?")
            } else if (msg.content.toLowerCase().includes("kden")) {
                msg.reply("live")
            } else if (msg.content.toLowerCase().includes("sausages")) {
                msg.reply("Sausages.")
            }
            }
        }
    }

    if (msg.content == 'kden') {
        msg.channel.send('live');
    }
      
    if (msg.content == prefix + 'help') {
        const embed = new Discord.RichEmbed();
        embed.setTitle('VTBot Help')
        embed.setDescription('Every command you put in this bot must start with `' + prefix + '`')
        embed.addField('- General Commands', 'ping', true)
        embed.setFooter("VTBot Copyright 2018. The version that VTBot's running is " + vtVersion + "!")
        embed.setColor("00C8FF")
        msg.channel.send({embed});
    }    

    if (msg.content == prefix + 'ping') {
        msg.reply(':warning: Pong!')
    }


});

client.login(config.token);
