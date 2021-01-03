const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'Bans a user.',
    usage: `ban`,
    run: async (client, message) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            const embed = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle(`You don't have the permissions to do that!`)

            message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
        } else {
            const user = message.mentions.users.first();

            if (user) {

                const member = message.guild.members.resolve(user);

                if (member) {

                    member
                        .ban({
                            reason: 'I am a mod!',
                        })
                        .then(() => {
                            const embed = new MessageEmbed()
                                .setColor(process.env.COLOR)
                                .setTitle(`Successfully banned ${user.tag}`)

                            message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
                        })
                        .catch(err => {
                            const embed = new MessageEmbed()
                                .setColor(process.env.COLOR)
                                .setTitle(`Failed to ban ${user.tag}`)

                            message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
                            console.error(err);
                        });
                } else {
                    const embed = new MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setTitle(`Unknown user!`)

                    message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
                }
            } else {
                const embed = new MessageEmbed()
                    .setColor(process.env.COLOR)
                    .setTitle(`No users were mentioned!`)

                message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));

            }
        }
    }
}