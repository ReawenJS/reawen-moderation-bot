const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const moment = require("moment")
const conf = require('../config.js');
const a = require('../config.js');

module.exports.run = async (client, message, args) => {

let reawEmbed = new Discord.MessageEmbed().setColor("f1f1f1").setFooter("Reawen bebeğim çok mükemmelsin :)").setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = reawEmbed;

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let sebep = args.splice(1).join(" ") || "Sebep belirtilmedi!";

if (!message.member.roles.cache.has(a.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return;

let reaw = message.guild.roles.cache.find(a => a.name === "@everyone");
let permReaw = {};
let everyone = message.channel.permissionOverwrites.get(reaw.id);
everyone.allow.toArray().forEach(p => {
    permReaw[p] = true;
});
everyone.deny.toArray().forEach(p => {
    permReaw[p] = false;
});
if(message.channel.permissionsFor(reaw).has('SEND_MESSAGES')) {
    permReaw["SEND_MESSAGES"] = false;
  message.channel.createOverwrite(reaw, permReaw);
  message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.yes)} Kanal kilitlendi! Yazma yetkileri alındı.`))
} else {
    permReaw["SEND_MESSAGES"] = null;
  message.channel.createOverwrite(reaw, permReaw);
  message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.yes)} Kanal kilidi açıldı! Yazma yetkileri geri verildi.`));
};

};

exports.config = {
  name: "kilit",
  guildOnly: true,
  aliases: ["lock", "kapat"],
};
