require('dotenv').config();

const { Client, IntentsBitField, ActivityType} = require('discord.js');
const client = new Client({intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]})
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const token = process.env.DISCORD_BOT_TOKEN;

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
    client.user.setActivity("Dusty Jenkins", {type: ActivityType.Watching});
})

client.on('messageCreate', message => {
    // Specify the channel to listen for messages
    if (message.channel.id !== '1091191113446080514') return;
  
    console.log(`Message received: ${message.content}`);
    
    if (message.author.bot) return; // Ignore messages from other bots
    if (!message.content) return; // Ignore messages with no content

    const content = message.content.toLowerCase();

    const keywords = ["billy", "plip", "destroyer", "jefferson", "882334202754574080", "882334242206218506"];
    
    // Check if any of the keywords are in the message
    const foundKeywords = keywords.filter(keyword => content.includes(keyword));
    
    // Determine if it's a weekday or weekend
    const date = new Date();
    const dayOfWeek = weekdays[date.getDay()];
    const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
    
    console.log(`Day of week: ${dayOfWeek}, isWeekend: ${isWeekend}`);
    
    // Respond accordingly
    if (foundKeywords.length > 0) {
      if (content.includes("tomorrow")) {
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDayOfWeek = weekdays[tomorrow.getDay()];
        if (tomorrowDayOfWeek === "Saturday" || tomorrowDayOfWeek === "Sunday") {
          message.reply("They are not working tomorrow.");
        } else {
          message.reply("They are working tomorrow.");
        }
      } else if (isWeekend) {
        message.reply("They are not working today.");
      } else {
        message.reply("They are working today.");
      }
    }
  });

  
  client.on('error', error => {
    console.log(error);
  });

client.login(token);