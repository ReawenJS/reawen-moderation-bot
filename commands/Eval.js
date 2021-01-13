const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const moment = require("moment")
const conf = require('../config.js');

module.exports.run = async (client, message, args) => {
  var m;
  var a;
  var dc;
  var conf;
  m = message;
  a = args;
  dc = Discord
  if(message.member.id != "id'niz") return false
  let codein = a.slice(0).join(' ')
  if(!codein.toLowerCase().includes('token')) {  
  try {
      let code = eval(codein)
      if (codein.length < 1) return m.channel.send(`Bir kod girmelisin.`)
      if (typeof code !== 'string')    
        code = require('util').inspect(code, { depth: 0 });
    
      if(code.includes(process.env.TOKEN)) return m.reply("sg tokeni başka yöntemle al")
      const embed = new dc.MessageEmbed()
      .setColor("RANDOM")
      .addField('Kod', `\`\`\`js\n${codein.length > 1024 ? "Karakter aşımı!" : codein}\`\`\``)
      .addField('Sonuç', `\`\`\`js\n${code.length > 1024 ? "Karakter aşımı!" : code}\n\`\`\``)
      m.channel.send(embed)
  } catch(e) {
    let embed2 = new dc.MessageEmbed()
    .setColor('RED')
    .addField('Kod', `\`\`\`js\n${codein.length > 1024 ? "Karakter aşımı!" : codein}\`\`\``)
    .addField('Hata', `\`\`\`js\n${e.length > 1024 ? "Karakter aşımı!" : e}\`\`\``)
    m.channel.send(embed2);
  }
  } else {
    m.channel.send('ucunu alırsın')
  }

};

exports.config = {
  name: "ev",
  guildOnly: true,
  aliases: ["eval"],
};