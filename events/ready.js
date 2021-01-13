const Discord = require("discord.js");
const config = require('../config.js');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `Reawen tarafından geliştirildi.`}, status: 'online' })
};

/*
Status kısmı için,

idle: Boşta,
dnd: Rahatsız Etmeyin,
online: Çevrimiçi
*/