exports.run = async function (Memer, msg, args) {
  if (!msg.member.permission.has('manageGuild') && !Memer.config.devs.includes(msg.author.id)) {
    return msg.reply('You are not authorized to use this command. You must have "Manage Server" to change the prefix.', msg)
  }
  const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id)
  if (!args[0]) {
    return msg.reply(`What do you want your new prefix to be?\n\nExample: \`${gConfig.prefix} prefix pepe\``) // please think of a better example..
  }
  if (args.join(' ').length > 10) {
    return msg.reply(`Your prefix can't be over 10 characters long. You're ${args.join(' ').length - 10} characters over the limit.`)
  }
  if (gConfig.prefix === args.join(' ').toLowerCase()) {
    return msg.reply(`\`${gConfig.prefix}\` is already your current prefix.`)
  }
  gConfig.prefix = args.join(' ').toLowerCase()
  await Memer.db.updateGuild(gConfig)
  msg.channel.createMessage({ embed: {
    color: Memer.colors.green,
    description: `Prefix successfully changed to \`${gConfig.prefix}\`.`
  }})
}

exports.props = {
  name: 'prefix',
  usage: '{command} <prefix of your choice>',
  aliases: [],
  cooldown: 5000,
  description: 'Change Dank Memer\'s prefix!',
  perms: ['embedLinks']
}
