const config = require('../config.js');
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  };
  if (cmd) {
    if(!message.guild) {
      if(cmd.config.guildOnly === true) {
        return;
      };
    };
    if (cmd.config.permLevel) {
      if(cmd.config.permLevel === "BOT_OWNER") {
   if(!config.geliştiriciler.includes(message.author.id)) {
        message.channel.send(`Bu komutu kullanabilmek için \`${cmd.config.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout: 3000}));
        return;
   }
      }
        if(!message.member.hasPermission(cmd.config.permLevel)) {
      message.channel.send(`Bu komutu kullanabilmek için \`${cmd.config.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout: 3000}));
     return;
      };
    };
    cmd.run(client, message, params);
};
};