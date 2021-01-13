const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const moment = require("moment")
const conf = require('../config.js');
const a = require('../config.js');

module.exports.run = async (client, message, args) => {

let reawEmbed = new Discord.MessageEmbed().setColor("f1f1f1").setFooter("Reawen bebeğim çok mükemmelsin :)").setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = reawEmbed;

let member = message.mentions.members.cache.get() || message.guild.members.cache.get(args[0]);
let sebep = args.splice(1).join(" ") || "Sebep belirtilmedi!";

if (!message.member.roles.cache.has(a.muteSorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Bu komutu kullanmak için gerekli yetkilere sahip değilsiniz!`))
message.react(a.no);
return;
};

if (!member) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Geçerli bir üye belirtmelisiniz!`))
message.react(a.no);  
return;
};

if (member.id === message.author.id) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Kendinize ceza veremezsiniz!`))
message.react(a.no);  
return;
};

if (message.member.roles.highest.position <= member.roles.highest.position) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Belirttiğiniz üye sizden üst/eşit pozisyonda!`))
message.react(a.no);  
return;
}

member.roles.add(a.muteRolu).catch();
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.yes)} ${member} kullanıcısı ${message.author} tarafından "${sebep}" sebebiyle mutelendi!`));
message.guild.channels.cache.get(a.muteLog).send(reawEmbed.setDescription(`${client.emojis.cache.get(a.yes)} ${member} kullanıcısı ${message.author} tarafından "${sebep}" sebebiyle mutelendi!`));
db.set(`muteli.${member.id}`, "muteli");
db.add(`muteSayi.${member.id}`, 1);
db.add(`muteSayiYT.${message.author.id}`, 1)
db.push(`sicil.${member.id}`, {Ceza: "mute", Yetkili: message.author.id, Sebep: sebep})
db.add(`cezaPuani.${member.id}`, 10)
};

exports.config = {
  name: "mute",
  guildOnly: true,
  aliases: ["sustur"],
};