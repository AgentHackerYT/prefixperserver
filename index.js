const Discord = require("discord.js")
const db = require(`quick.db`)
const client = new Discord.Client()
const config = require(`./config.json`)
client.on("ready", () => {
    console.log(`Ready!`)
})
client.on(`message`, async(message) => {
    let perfix = await db.fetch(`prefix_${message.guild.id}`)
    if(perfix === null) perfix = "!" 
    let prefix = perfix;
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
    if(command === "prefix"){
        try{
        if(message.member.hasPermission('MANAGE_GUILD')){
        if(perfix === args[0]) return message.channel.send(`Its already the prefix for this guild!`)
            if(!args[0]) return message.channel.send(`What do u want the prefix to be\n Usage ${prefix}prefix (prefix u want)`)
        db.set(`prefix_${message.guild.id}`, args[0])
        message.channel.send(`Prefix for this guild has been set to \`${args[0]}\` !`)
    }else{
        message.channel.send(`You dont have the permissions`)
    }
}catch (e){
    message.channel.send(`An error occured`)
}
}
if(command === "ping"){
    message.channel.send(`Pong!`)
}
})
client.login(config.token)