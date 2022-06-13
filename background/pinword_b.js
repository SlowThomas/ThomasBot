const { Pingword } = require("../db.js")
module.exports = {
    async listen(message) {
        const text = message.content;
        const pingword = await Pingword.findAll();//pingword is an array, each element represents a different user
        console.log(pingword);
        for (const user of pingword) {
            const pinged = JSON.parse(user.dataValues.pinged)
            for (const ping of pinged) {
                if (text.toLowerCase().includes(ping)) {
                    //private chat the user
                    message.client.users.fetch(user.userid, false).then((directmessage) => {
                        directmessage.send(`Your pingword "${ping}" was used by ${message.author.username} in ${message.channel.name} in server "${message.guild.name}"\nSee message link below: ${message.url}`);
                    });
                }
            }
        }
    }
}