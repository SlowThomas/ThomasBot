const { Pingword } = require("../db.js")
module.exports = {
    name: 'pin',
    description: '',
    argsRequired: true,

    async execute(message, args) {
        switch (args[0]) {
            case "add":
                add(message, args);
                break;
            case "remove":
                remove(message, args);
                break;
            default:
                let list = await Pingword.findOne({ where: { userid: message.author.id } });
                if (list == null) {
                    message.channel.send(`your list is empty, try adding some new things`);
                }
                else {
                    message.channel.send(`here's what you have: ${list.dataValues.pinged}`);
                }
                break;
        }
    }
};

async function add(message, args) { //args might be changed

    if (args == null || args.length < 2) {
        return message.channel.send(`invalid input, here's how you use this command: ${module.exports.description}`)
    }
    let list = await Pingword.findOne({ where: { userid: message.author.id } });
    if (list == null) {
        list = await Pingword.create({ pinged: "[]", userid: message.author.id });//JSON.stringfy([])
    }
    args.shift();
    let original = [];
    original = original.concat(JSON.parse(list.dataValues.pinged));
    //console.log(list);
    if (original.includes(args.join(' '))) {
        return message.channel.send("This text is aready updated before")
    }
    original.push(args.join(' '));
    const new_list = JSON.stringify(original);
    //console.log(original);
    await Pingword.update({ pinged: new_list }, {
        where: {
            userid: message.author.id
        }
    });
    return message.channel.send(`here's your updated list: ${new_list}`)
}

async function remove(message, args) {
    if (args == null || args.length < 2) {
        return message.channel.send(`invalid input, here's how you use this command: ${module.exports.description}`)//todo****
    }
    let list = await Pingword.findOne({ where: { userid: message.author.id } });
    if (list == null || list.dataValues.pinged == "[]") {
        return message.channel.send(`your list is empty, try adding some new things`)
    }
    args.shift();

    let original = [];
    original = original.concat(JSON.parse(list.dataValues.pinged));

    const index = original.indexOf(args.join(' '));
    if (index > -1) {
        original.splice(index, 1); // 2nd parameter means remove one item only
    }
    else{
        return message.channel.send(`you haven't added that prase yet ;)\n\nHere's what you have in your list: ${original})
}`)
    }

    const new_list = JSON.stringify(original);
    await Pingword.update({ pinged: new_list }, {
        where: {
            userid: message.author.id
        }
    });
    return message.channel.send(`here's your updated list: ${new_list}`)
}
