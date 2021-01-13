const Discord = require("discord.js")    
const client = new Discord.Client();      
const config = require("./config.js") 
const fs = require("fs");
const db = require("quick.db");                
require('./util/Loader.js')(client);    

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                    
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`); 
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(config.token);

client.on("guildMemberAdd", member => {
if (db.fetch(`jailli.${member.id}`)) {
member.guild.channels.cache.get(config.jailLog).send(new Discord.MessageEmbed().setFooter("Reawen sana serendiada laf ediyolarmış :(").setColor("010000").setTimestamp().setDescription(`
${client.emojis.cache.get(config.no)} ${member} ( \`${member.id}\` ) isimli kullanıcı jailli iken çıkıp girdiği için tekrar jaillendi!
`))
member.roles.set([a.jailRolu]);
}
})

client.on("guildMemberAdd", member => {
  if (db.fetch(`muteli.${member.id}`)) {
  member.guild.channels.cache.get(config.muteLog).send(new Discord.MessageEmbed().setFooter("Reawen sana serendiada laf ediyolarmış :(").setColor("010000").setTimestamp().setDescription(`
  ${client.emojis.cache.get(config.no)} ${member} ( \`${member.id}\` ) isimli kullanıcı muteli iken çıkıp girdiği için tekrar mutelendi!
  `))
  member.roles.add(a.muteRolu);
  }
  })