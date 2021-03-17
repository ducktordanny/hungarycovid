const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

const sendDiscordMessage = async (msg) => {
   
   await Promise.all([
      new Promise(resolve => {
         client.once('ready', resolve);
      }),
      client.login(process.env.BOT_TOKEN)
   ]);
   console.log('Connected to Discord...');

   const guildID = '745748477744513084';
   const guild = await client.guilds.fetch(guildID);
   const channel = await guild.channels.resolve('821775245563789353');

   await channel.send(msg);
   console.log('Message sent...');
   client.destroy();
}

module.exports = {
   sendDiscordMessage,
};