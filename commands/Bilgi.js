const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const moment = require("moment")
const conf = require('../config.js');
const a = require('../config.js');

module.exports.run = async (client, message, args) => {

let reawEmbed = new Discord.MessageEmbed().setColor("f1f1f1").setFooter("Reawen bebeğim çok mükemmelsin :)").setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = reawEmbed;

if (!args[0]) {
message.channel.send(reawEmbed.setDescription(`
:no_entry_sign: **Ceza Bilgilendirmesi:**

\`>\` Cezalar hakkında bilgi almak için bu komutu kullanabilirsiniz! Cezaların nasıl işlediği, hangi konuda ne biçimde yardım alabileceğiniz aşağıda belirtilmiştir.

Cezalar veritabanına kaydedilir. Her ceza başına belirli ceza puanları alırsınız. Ceza puanları aşağıda verilmiştir.

Ban: **25**
Kick: **20**
Jail: **15**
Mute: **10**

Her ceza sebepleri ile beraber sicil veritabanına kaydedilir. Sicil kayıtlarına bakmak için: **${a.prefix}sicil @Reawen/ReawenID
`))
return; 
}

if (args[0] === "jail") {
message.channel.send(reawEmbed.setDescription(`
:no_entry_sign: **Jail Ceza Bilgilendirmesi:**

\`>\` Ceza Puanı: **15**.
\`>\` Gerekli Rol: <@&${a.jailSorumlusu}>
\`>\` Ceza Rolü: <@&${a.jailRolu}>
\`>\` Ceza: **Kanallara erişim yetkiniz alınır.**
`))
return;
}
if (args[0] === "mute") {
message.channel.send(reawEmbed.setDescription(`
:no_entry_sign: **Mute Ceza Bilgilendirmesi:**
    
\`>\` Ceza Puanı: **10**.
\`>\` Gerekli Rol: <@&${a.muteSorumlusu}>
\`>\` Ceza Rolü: <@&${a.muteRolu}>
\`>\` Ceza: **Metin kanallara yazma yetkiniz alınır.**
    `))
    return;
    }
    if (args[0] === "ban") {
message.channel.send(reawEmbed.setDescription(`
    :no_entry_sign: **Ban Ceza Bilgilendirmesi:**
            
    \`>\` Ceza Puanı: **25**.
    \`>\` Gerekli Rol: <@&${a.banSorumlusu}>
    \`>\` Ceza Rolü: Bulunmamaktadır!
    \`>\` Ceza: **Sunucudan sınırdışı edilirsiniz!**
    `))
    return;
}
};

exports.config = {
  name: "bilgi",
  guildOnly: true,
  aliases: ["info", "cezalar"],
};