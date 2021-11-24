console.log("NodeJS Version: " + process.version)

const Aoijs = require("aoi.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/views/index.html');
});
app.listen(3000, () => console.log(`PROPER FUNCTIONING`));

const Discord = require("discord.js");

const bot = new Aoijs.Bot({

        connectedBots: true, 
sharding: true,
shardAmount: 100,
    token: process.env.TOKEN

    prefix:['$getservervar[prefix]','$getglobaluservar[up]'], //change the prefix in variables
  mobile: false,
suppressAll: true,
errorMessage: "",
fetchInvites: true,
applicationCache: true,
intents: "all"
})

const disbut = require('discord-buttons') 
disbut(bot.client)
//Allows to execute Command


const fetch = require('node-fetch');



bot.variables(require('./Variables.js'))

bot.loadCommands(`./Commands/`)

bot.onMessage({
  guildOnly: false,

respondToBots:false// commands will work in dms. set "true" for commands to work in guilds only
});

bot.status({
text: "on better servers", 
type: "STREAMING",
    status: "online",
url: "https://twitch.tv/"
})

bot.status({
  text: "levels",
  type: "WATCHING",
    status: "online",
  time: 12
})

bot.status({
  text: "for >help",
  type: "WATCHING",
      status: "online",
  time: 12
})


bot.status({
  text: "levels",
  type: "WATCHING",
      status: "online",
  time: 12
})

bot.status({
  text: "running on port 2028",
  type: "PLAYING",
  status: "online",
  time: 12
})

bot.command({
    name: "guess",
    code: `
Alright. Guess my number from \`1 - 10\`. Either type \`<guess>\` or \`hint\`
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[guess;$random[1;10]]
$setUserVar[hint;2]
$setUserVar[msg;0]
`
})
bot.awaitedCommand({
    name: "guess",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it.
$elseIf[$toLowercase[$message[1]]==hint]
Take a guess first before taking a hint
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`3\` tries left, \`$getUserVar[hint]\` hint(s) left.
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess2",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it.
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$setUserVar[hint;$sub[$getUserVar[hint];1];$authorID]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`2\` tries left, \`$getUserVar[hint]\` hint(s) left
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess3",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$setUserVar[hint;$sub[$getUserVar[hint];1];$authorID]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`1\` try left, \`$getUserVar[hint]\` hint(s) left
$awaitMessages[$authorID;1m;everything;guess4;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess4",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess4;I have waited for to long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess4;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! My number is \`$getUserVar[guess]\`
$endIf
`
})

bot.command({
name: "splitText",
code: `
$splitText[1] test1
$splitText[2] test2
`
})

bot.joinCommand({
  channel: "$getServerVar[verifchannel]",
  code: `
  <@$authorID>
  $title[:white_check_mark:VERIFICATION]
  $description[Verify Your Self To Access This Server
  With Send **$getUserVar[code]** At This Channel]
  $image[https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fi.imgur.com%2FOrxlL0R.jpg&text=$getUserVar[code]&text_size=128&y_align=middle&x_align=center]
  $setUserVar[code;$randomString[5]]
  $onlyIf[$getServerVar[verify]oN;]
  `})

  bot.command({
    name: "setup",
    code: `
    $awaitMessages[$authorID;30s;everything;tsp2;Command has been cancelled]
    $sendMessage[**Which Category Do you want to make For Ticket System.
    Provide the Category ID. 
    This Command will be cancelled after** \`30 seconds\`.;no]
    $onlyPerms[admin;Only Users with \`ADMIN\` perms can use this{delete:10s}]
    $suppressErrors[]`
   })
    
   bot.awaitedCommand({
    name: "tsp2",
    code: `
   **✅ Setup ticket is complete**
    $setServerVar[ticketchannel;$message]
    $onlyIf[$channelExists[$message]==true;Provided Category Doesn't Exist{delete:10s}]
    $onlyIf[$isNumber[$message]==true;Please provide Category ID{delete:10s}]`
   })
    
   bot.command({
    name: "ticket",
    code: `
   $newTicket[ticket-$username[$authorID];{title:Ticket opened!}{description:Hello, <@$authorID>. Here is your ticket!:tickets: Please give the information about your problem or feedback. 
   Thanks in advance for being patient}{footer:Use close to close your ticket};$getServerVar[ticketchannel];no;<@$authorID>, I failed to create your ticket! Try again]
   $sendMessage[Ticket Successfully opened! Hello, <@$authorID>. Go to **$toLowercase[#$username$discriminator]** to describe your issue!;Something went wrong]
 $deleteCommand`
   })
    
   bot.command({
    name: "close",
    code: `
   $closeTicket[This is not a ticket]
   $onlyIf[$checkContains[$channelName;ticket]==true;This command can only be used in tickets{delete:10s}]
   $suppressErrors`
   })
   
bot.command({
name:"giveaway",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (ENDED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won **$get[prize]**;no]
$onlyif[$getmessagevar[ended]==false;]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$wait[$get[time]]
$setmessagevar[endstamp;$get[endstamp];$get[e]]
$setmessagevar[hoster;$authorid;$get[e]]
$setmessagevar[prize;$get[prize];$get[e]]
$let[e;$apimessage[$channelid;;{author:🎉 GIVEAWAY 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**No one** has joined this giveaway}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE};{actionRow:🎊 Join 🎊,2,3,join:🔁 Reroll 🔁,2,1,reroll:🔚 End 🔚,2,4,end};;yes]]
$let[endstamp;$sum[$datestamp;$ms[$get[time]]]]
$let[prize;$messageslice[1]]
$onlyif[$ms[$get[time]]!=undefined;Invalid time provided]
$let[time;$message[1]]
$onlyif[$message[2]!=;Enter a time and a prize]`})
bot.onInteractionCreate()
bot.interactionCommand({
name:"join",
prototype:"button",
code:`$editmessage[$get[msg];{author:🎉 GIVEAWAY 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$get[host]>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users have participated in this giveaway.}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE}]
$setmessagevar[joinedusers;$getmessagevar[joinedusers;$get[msg]]$authorid@;$get[msg]]
$setmessagevar[joined;$get[participated];$get[msg]]
$onlyif[$get[condition]==false;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];false;Joined the giveaway];true;You have already joined the giveaway];ended;The giveaway ended];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;ended];false;$get[condition]]]
$let[condition;$checkcontains[$getmessagevar[joinedusers;$interactiondata[message.id]];$authorid]]
$let[participated;$sum[$getmessagevar[joined;$get[msg]];1];$get[msg]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"reroll",
prototype:"button",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (REROLLED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Reroll:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won the reroll of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]
})==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Rerolled the giveaway];true;This giveaway has not ended yet];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;$replacetext[$replacetext[$get[condition];true;perform];false;false]];false;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"end",
prototype:"button",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (FORCE ENDED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Force End:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won the giveaway(force ended) of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Ended the giveaway];true;This giveaway has already ended];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];false;$replacetext[$replacetext[$get[condition];true;perform];false;false]];true;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})

bot.command({
    name: "shardID",
    code: `Guilds Shard: $shardID`
})
  
bot.command({
name: "create",
code: `$createSlashCommand[$guildID;say;send a message;message:your message:true:3]`})

bot.command({
name: "create",
code: `$createSlashCommand[$guildID;AOIjs;A cool slash command for AOIjs]`
/*
    Code Breakdown:
This will make a slashcommand named "AOIjs" (meaning you'd do /AOIjs),
the description will say "A cool slash command for AOIjs"
*/
})

bot.command({
name: "create",
code: `$createSlashCommand[$guildID;AOIjs;A cool slash command for AOIjs]`
/*
    Code Breakdown:
This will make a slashcommand named "AOIjs" (meaning you'd do /AOIjs),
the description will say "A cool slash command for AOIjs"
*/
})

bot.reactionAddCommand({
  channel:"$channelid",
  code:`$setchannelvar[to;$authorid;$splittext[1]]
  $textsplit[$newticket[ticket-$username-$discriminator;<@$authorid> {title:Welcome to your ticket, $username!}{description:$advancedtextsplit[$getservervar[tmm];/;$findtextsplitindex[$messageid]]}{color:FFFF}{footer:$username[$clientid] tickets | Created with ❤️:$useravatar[$clientid]}{thumbnail:$authoravatar}{author:$usertag:$replacetext[$replacetext[$checkcondition[$servericon==];true;];false;$servericon]};$advancedtextsplit[$getservervar[tmc];/;$findtextsplitindex[$messageid]];yes;]; ]
  $clearreactions[$channelid;$messageid;$authorid;$emojitostring]
  $onlyif[$findtextsplitindex[$messageid]!=0;]
  $onlyif[$isbot==false;]
  $textsplit[$getservervar[tmid];/]
  $onlyif[$getservervar[tmid]!=a;]
  $onlyif[\`$emojitostring\`==\`🎫\`;]`})
  bot.onReactionAdd()

bot.command({
name: "create",
code: `$createSlashCommand[$guildID;say;send a message;message:your message:true:3]`
/*
    Code Breakdown:
    Same thing as above but adds a required field. Example in image below
*/
})

	
bot.command({
name: "work", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[45;100]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[5;40]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Work]
$description[
$username, $randomText[it looks like you'd do anything for money 😳.;you were employed as a construction worker today!;you're a discord workaholic!;nice music dude! Here, you earned it!;you were employed as a hair stylist today;hacking can make you a good deal of money if you know what you're doing! From your last hack job, you made;your bitcoin miner scraped up some cash for you!;were you not satisfied with your past employers? Well I counted the tips from your pole dancing gig and you didn't do too bad 😳]
]
$footer[💵 +$$random[45;100] | 🗡 +$random[5;40]xp]
$globalCooldown[1h;Try again in %time%]`
})
 
bot.command({
name: "beg", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;25]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[0;5]];$authorID]
$title[Beg]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[Begging is for the weak so here;Here, take this and go;Here, don't let this be a habit;I take you for a well put together human being, why are you begging?;Why can't you just get a job?]
]
$footer[💵 +$$random[0;25] | 🗡 +$random[0;5]xp]
$globalCooldown[30s;Quit being a begger and try again in %time%]`
})
 
bot.command({
name: "bal", 
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$color[RANDOM]
$title[$username[$mentioned[1;yes]]'s Balance]
$description[
$addField[🗡 Experience;
$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]xp
]
$addField[💵 Wallet;
$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]
]
$addField[🏦 Bank;
$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]
]
$addField[📊 Net Worth;
$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]
]]`
})
 
bot.command({
name: "profile",
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ Discord bots dont have profiles**]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$title[$usernames profile]
$color[RANDOM]
$description[
**__Badge__** 
<:10kbadge:908679164700287036> ($getGlobalUserVar[PoorBadge;$mentioned[1;yes]]) <:50kbadge:908679117438853130> ($getGlobalUserVar[RichBadge;$mentioned[1;yes]]) <:100kbadge:908679097998245919> ($getGlobalUserVar[MillionerBadge;$mentioned[1;yes]]) <:500kbadge:908679139291189248> ($getGlobalUserVar[BillionaireBadge;$mentioned[1;yes]])
]`
})

 
bot.command({
name: "deposit", 
aliases: 'dep',
code: `$setGlobalUserVar[Bank;$sum[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$title[Deposited]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you deposited $$numberSeparator[$message] into your bank!]
$footer[💵 $$numberSeparator[$sub[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sum[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Wallet;$authorID];Cannot deposit more than what's in your wallet!]
$argsCheck[>1;How much are you depositing? Try this: \`$getServerVar[prefix]dep <amount>\`]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>0;There's nothing to deposit!]`
})
 
 
bot.command({
  name: 'withdraw',
  aliases: 'with',
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$title[Withdrew]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you withdrew $$numberSeparator[$message] from your bank!]
$footer[💵 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sub[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Bank;$authorID];Cannot withdraw more than what's in your bank!]
$argsCheck[>1;How much are you withdrawing?]
$onlyIf[$getGlobalUserVar[Bank;$authorID]>0;There's nothing to withdraw!]`
})
 
 
bot.command({
name: "daily",
code: `$setGlobalUserVar[DailyChest;$sum[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily Chest]
$description[
Congrats $username! You received 1 daily chest!
This action can be done once every 24 hours.
]
$footer[To open use, $getServerVar[prefix]open-daily]
$onlyIf[$getGlobalUserVar[DailyChest;$authorID]<1;**You still have an unopened daily chest in your inventory. Open it for room to receive another chest.** \`$getServerVar[prefix]open-daily\`]
$globalCooldown[24h;**⛔ Please wait %time% before you can claim another daily chest!**]`
})
 
 
bot.command({
name: "open-daily",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[DailyChest;$sub[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];15];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily Chest]
$description[<a:dailychest:909299694335840258> $username, you opened your Daily Chest!
]
$footer[💵 +$250 | 🗡 +15xp]
$onlyIf[$getGlobalUserVar[DailyChest;$authorID]==1;**⛔ You dont have a Daily Chest yet! Try using \`$getServerVar[prefix]daily\` to receive your Daily Chest and then run this command to open it**]`
})
 
 
bot.command({
name: "heist",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[4800;7600]];$authorID]
$setGlobalUserVar[laptop;$sub[$getGlobalUserVar[laptop;$authorID];1];$authorID]
$setGlobalUserVar[smartphone;$sub[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
$setGlobalUserVar[duffle;$sub[$getGlobalUserVar[duffle;$authorID];1];$authorID]
$setGlobalUserVar[tv;$sub[$getGlobalUserVar[tv;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[20;42]];$authorID]
$color[00ff00]
$thumbnail[$userAvatar[$authorID]]
$title[Heist]
$description[$username, you used a \`Laptop\` to hack the security system in your favor, a rooted \`Smartphone\` to shut down the cameras and used the \`TV\` screen to monitor surveillance while you fill your \`Bag\` with a buttload of cash and then tossed the contraband $randomText[in a lake!;over a bridge!;down a storm drain!;in separate dumpsters around town!;in the bed of a random truck!;on a roof!;in a ditch!]
]
$footer[💵 +$$numberSeparator[$random[4800;7600]] | 🗡 +$random[20;42]]
$onlyIf[$getGlobalUserVar[laptop;$authorID]>=1;Missing laptop. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[smartphone;$authorID]>=1;Missing smartphone. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[duffle;$authorID]>=1;Missing bag. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[tv;$authorID]>=1;Missing TV. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need at least 300 XP to commit a heist! \`XP will not be deducted and is only needed as a requirement!\`]
$globalCooldown[3h;Wait %time% until you can launch another heist!]`
})
 
bot.command({
name: "givemoney", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$noMentionMessage];$authorID]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username gave $username[$mentioned[1]] money]
$description[
$username gave $username[$mentioned[1]] **$noMentionMessage** :dollar:!
$username[$mentioned[1]] is now holding **$sum[$getGlobalUserVar[Wallet;$mentioned[1]];$noMentionMessage]** :dollar: in his wallet!
]
$onlyIf[$noMentionMessage<=$getGlobalUserVar[Wallet;$authorID];**⛔ You don't have enough in your wallet**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't give money to yourself**]
$onlyIf[$mentioned[1]!=;**⛔ Mention someone to give money to and then the amount, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
$onlyIf[$isBot[$mentioned[1]]!=true;**⛔ You can't give money to a Discord bot**]
$onlyIf[$isNumber[$noMentionMessage]==true;**⛔ That is not a number, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
$suppressErrors[Usage: **$getServerVar[prefix]givemoney <@user> <amount>**]`
})
 
bot.command({
name: "shop", 
code: `$thumbnail[$authorAvatar]
$title[Economy Shop]
$color[#2f3136]
$description[
$addField[__Items:__;
💼 **$250 | bag**
📺 **$400 | tv**
📱 **$500 | phone**
💻 **$1,000 | laptop**
🚗 **$10,000 | car**
🚚 **$15,000 | truck**
🚁 **$20,000 | helicopter**
🏫 **$50,000 | apartment**
🏡 **$100,000 | house**
🏰 **$500,000 | mansion**
<a:shovel:908937674889523220> **$105 | shovel**
<:fishingpole:906392489747963934>  **$150 | fishing-pole**
<:pickaxe:909402020044238860> **$100 | pickaxe**
<:plant:909421404204699679> **$100 | plant**
]

$addField[__badges:__;
<:10kbadge:908679164700287036> **$10,000** | Poor badge
<:50kbadge:908679117438853130> **$50,000** | Rich badge
<:100kbadge:908679097998245919> **$100,000** | Millioner badge
<:500kbadge:908679139291189248> **$500,000** | Billionaire badge]


$addField[__Purchasable chests:__;
**$250 | lucky**
**$1,000 | spiteful**
Lucky - **Press your luck. Nobody loses!**
Spiteful - **Possibility of winning $10,000 but be warned, it could be spiteful! Goodluck!**
]]`
})
 
bot.command({
name: "buy-car", 
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];10000];$authorID]
$setGlobalUserVar[car;$sum[$getGlobalUserVar[car;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];250];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=10000;Need $10,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=250;You need 250 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚗 $username]
$description[
Nice! You bought a Car for $10,000!
**250xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-car]`
})
 
bot.command({
name: "buy-phone",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500];$authorID]
$setGlobalUserVar[smartphone;$sum[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>499;Need $500 in your wallet, try withrawing it first]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[📱 $username]
$description[
Nice! You bought a smartphone for $500!
]
$footer[This item is used to commit a heist]`
})

bot.command({
name: "buy-plant", 
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100];$authorID]
$setGlobalUserVar[plant;$sum[$getGlobalUserVar[plant;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=99;Need $100 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:plant:90942>buy-plant1404204699679> $username]
$description[
Nice! You bought a plant for $100!
]
$footer[Usage: $getServerVar[prefix]buy-plant]`
})
 
bot.command({
name: "buy-tv",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];400];$authorID]
$setGlobalUserVar[tv;$sum[$getGlobalUserVar[tv;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>399;Need $400 in your wallet, try withrawing first]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[📺 $username]
$description[
Nice! You bought a TV for $400!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-truck",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];15000];$authorID]
$setGlobalUserVar[truck;$sum[$getGlobalUserVar[truck;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];300];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=15000;Need $15,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need 300 XP, in which will be deducted after purchase]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚚 $username]
$description[
Nice! You bought a Truck for $15,000!
**300xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-truck]`
})
 
bot.command({
name: "buy-laptop",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
$setGlobalUserVar[laptop;$sum[$getGlobalUserVar[laptop;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[💻 $username]
$description[
Nice! You bought a laptop for $1,000!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-poor-badge",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];10000];$authorID]
$setGlobalUserVar[PoorBadge;$sum[$getGlobalUserVar[PoorBadge;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>9999;Need $10,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:10kbadge:908679164700287036> $username]
$description[
Nice! You bought poor badge for $10,000!
]
$footer[This item is a badge]`
})

bot.command({
name: "buy-rich-badge",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];50000];$authorID]
$setGlobalUserVar[RichBadge;$sum[$getGlobalUserVar[RichBadge;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>49999;Need $50,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:50kbadge:908679117438853130> $username]
$description[
Nice! You bought rich badge for $50,000!
]
$footer[This item is a badge]`
})

bot.command({
name: "buy-millioner-badge",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100000];$authorID]
$setGlobalUserVar[MillionerBadge;$sum[$getGlobalUserVar[MillionerBadge;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>99999;Need $100,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:100kbadge:908679097998245919> $username]
$description[
Nice! You bought millioner badge for $100,000!
]
$footer[This item is a badge]`
})

bot.command({
name: "buy-billionaire-badge",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500000];$authorID]
$setGlobalUserVar[BillionaireBadge;$sum[$getGlobalUserVar[BillionaireBadge;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>499999;Need $10,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:500kbadge:908679139291189248> $username]
$description[
Nice! You bought billionaire badge for $10,000!
]
$footer[This item is a badge]`
})

bot.command({
name: "buy-fishing-pole",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];150];$authorID]
$setGlobalUserVar[fishingpole;$sum[$getGlobalUserVar[fishingpole;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>149;Need $150 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:fishingpole:906392489747963934> $username]
$description[
Nice! You bought the fishing pole for $150!
]
$footer[This item is a fishing pole]`
})

bot.command({
name: "buy-shovel",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];105];$authorID]
$setGlobalUserVar[shovel;$sum[$getGlobalUserVar[shovel;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>104;Need $105 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<a:shovel:908937674889523220> $username]
$description[
Nice! You bought the shovel for $105!
]
$footer[This item is a shovel]`
})

bot.command({
name: "buy-pickaxe",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100];$authorID]
$setGlobalUserVar[pickaxe;$sum[$getGlobalUserVar[pickaxe;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>99;Need $100 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[<:pickaxe:909402020044238860> $username]
$description[
Nice! You bought the pickaxe for $100!
]
$footer[This item is a pickaxe]`
})

bot.command({
name: "buy-helicopter",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];20000];$authorID]
$setGlobalUserVar[helicopter;$sum[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];350];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=20000;Need $20,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=350;You need 350 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚁 $username]
$description[
Nice! You bought a Helicopter for $20,000!
**350xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-helicopter]`
})
 
bot.command({
name: "buy-house",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100000];$authorID]
$setGlobalUserVar[house;$sum[$getGlobalUserVar[house;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];500];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=100000;Need $100,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=500;You need 500 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🏡 $username]
$description[
Nice! Stepping up! You bought a House for $100,000!
**500 XP has been deducted!**
Coming up in the world I see! The real estate business is in high demand and you can make a difference! Try flipping the house to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-house]`
})
 
 
bot.command({
name: "buy-apartment",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];50000];$authorID]
$setGlobalUserVar[apartment;$sum[$getGlobalUserVar[apartment;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];400];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=50000;Need $50,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=400;You need 400 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🏫 $username]
$description[
Nice! Stepping up! You bought an Apartment for $50,000!
**400xp has been deducted!**
The real estate business is in high demand and you can make a difference! Try flipping the apartment to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-apartment]`
})
 
bot.command({
name: "buy-mansion",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500000];$authorID]
$setGlobalUserVar[mansion;$sum[$getGlobalUserVar[mansion;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];750];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=500000;Need $500,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=750;You need 750 XP, in which will be deducted after purchase]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏰 $username]
$description[
Nice! You bought a Mansion for $500,000!
**750 XP has been deducted!**
Now you're just showing off and living it up lol! Try flipping the mansion to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-mansion]`
})
 
bot.command({
name: "buy-bag",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[duffle;$sum[$getGlobalUserVar[duffle;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[💼 $username]
$description[
Nice! You bought a dufflebag for $250!
]
$footer[This item is used to commit a heist]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withdrawing it first]`
})
 
bot.command({
name: "buy-spiteful",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
$setGlobalUserVar[spiteful;$sum[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Spiteful Chest]
$description[You bought a Spiteful chest for $1,000!
**Open it and see what you find!
Just be warned! It could be spiteful, Goodluck!**
]
$footer[Usage: $getServerVar[prefix]open-spiteful]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first]`
})
 
bot.command({
name: "open-spiteful",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]];$authorID]
$setGlobalUserVar[spiteful;$sub[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[10;20]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Spiteful Chest]
$description[<a:spitefulchest:909299856143691776> You opened a spiteful Chest!
]
$footer[💵 +$$numberSeparator[$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]] | 🗡 +$random[10;20]xp]
$onlyIf[$getGlobalUserVar[spiteful;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
$globalCooldown[20m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
})
 
bot.command({
name: "buy-lucky",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[lucky;$sum[$getGlobalUserVar[lucky;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withrawing it first.]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Lucky Chest]
$description[You bought a lucky chest for $250!
Open it and press your luck for a chance to get the $5,000 lucky pot! Goodluck!
]
$footer[Usage: $getServerVar[prefix]open-lucky]`
})
 
bot.command({
name: "open-lucky",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]];$authorID]
$setGlobalUserVar[lucky;$sub[$getGlobalUserVar[lucky;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[3;7]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Lucky Chest]
$description[<:luckytreasure:909299176758714418>  You opened a lucky Chest!
]
$footer[💵 +$$numberSeparator[$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]] | 🗡 +$random[3;7]xp]
$onlyIf[$getGlobalUserVar[lucky;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
$globalCooldown[3m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
})

	
bot.command({
name: "rob",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]];$mentioned[1]]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;75];$authorID]]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]];$mentioned[1]]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username robbed $username[$mentioned[1]]]
$description[
$addField[$username;
💵 +$$random[0;750]
🗡 +$random[50;75]xp
Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]] | $sum[$getGlobalUserVar[XP;$authorID];$random[50;75]]xp
]
$addField[$username[$mentioned[1]];
Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]]xp
]]
$footer[💵 -$$random[0;750] | 🗡 -$random[50;75]xp]
$globalCooldown[15m;You can rob someone again in %time%]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=750;Your wallet needs to contain at least $750 to rob someone.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=75;You need at least 75xp to rob someone.]
$onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=25;They need at least 25xp]
$onlyIf[$getGlobalUserVar[Wallet;$mentioned[1]]>=750;Their wallet needs to contain at least $750]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ You can't rob discord bots**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't rob yourself**]
$onlyIf[$mentioned[1]!=;**⛔ Mention someone to rob**]`
})
 
 
//Steal from someones bank account and XP base
bot.command({
name: "steal",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[250;2500]];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$mentioned[1]];$random[250;2500]];$mentioned[1]]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[75;150]];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]];$mentioned[1]]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username stole from $username[$mentioned[1]]'s bank]
$description[
$addField[$username;
💵 +$$random[1000;2500]
🗡 +$random[75;150]xp
Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[1000;2500]] | $sum[$getGlobalUserVar[XP;$authorID];$random[75;150]]xp
]
$addField[$username[$mentioned[1]];
Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[1000;2500]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]]xp
]]
$footer[💵 -$$random[1000;2500] | 🗡 -$random[75;150]xp]
$globalCooldown[30m;You can steal from someone's bank account again in %time%]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=1000;You need at least 1,000 XP to steal from someone's bank account]
$onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=500;They need at least 500 XP to be sapped from!]
$onlyIf[$getGlobalUserVar[Bank;$mentioned[1]]>=7500;Their bank needs to contain at least $7,500 to be stolen from.]
$onlyIf[$isBot[$mentioned[1]]!=true;You can't steal from discord bots]
$onlyIf[$mentioned[1]!=$authorID;You can't rob yourself lol]
$onlyIf[$mentioned[1]!=;Mention someone to steal from thier bank account. Try this: \`$getServerVar[prefix]steal @user\`]`
})
 
bot.command({
name: "search",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[20;60]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[1;5]];$authorID]
$title[Search]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[you looked under the welcome mat.;you went searching thru your mom's purse while she was asleep.;you're hungry so you decided to search thru the dumpster behind the Subway.;you searched your dads truck very thoroughly.;your friends came over and when one of them went to the bathroom, you searched thru his coat pockets.]
]
$footer[💵 +$$random[20;60] | 🗡 +$random[1;5]xp]
$globalCooldown[35s;Looking for a little loose change? You're going to have to try again in %time%]`
})
 
bot.command({
name: "scrap-car",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[11000;16000]];$authorID]
$setGlobalUserVar[car;$sub[$getGlobalUserVar[car;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[260;300]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚗 Scrapped]
$description[
Nice $username! You scrapped a car for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[11000;16000]] | 🗡 +$random[260;300]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[car;$authorID]>=1;You need at least 1 \`Car\` in your inventory to scrap]`
})
 
bot.command({
name: "inventory",
aliasis: "inv",
code: `$color[#2f3136]
$title[$usernames inventory]
$description[**__Chests__**:
<a:dailychest:909299694335840258> **$getGlobalUserVar[DailyChest;$mentioned[1;yes]]** | Daily
<:luckytreasure:909299176758714418> **$getGlobalUserVar[lucky;$mentioned[1;yes]]** | Lucky
<a:spitefulchest:909299856143691776> **$getGlobalUserVar[spiteful;$mentioned[1;yes]]** | Spiteful
 
**__Assets__**:
💼 ($getGlobalUserVar[duffle;$mentioned[1;yes]]) Bags
📺 ($getGlobalUserVar[tv;$mentioned[1;yes]]) TVs
📱 ($getGlobalUserVar[smartphone;$mentioned[1;yes]]) Smartphones
💻 ($getGlobalUserVar[laptop;$mentioned[1;yes]]) Laptops
🚗 ($getGlobalUserVar[car;$mentioned[1;yes]]) Cars
🚚 ($getGlobalUserVar[truck;$mentioned[1;yes]]) Trucks
🚁 ($getGlobalUserVar[helicopter;$mentioned[1;yes]]) Helicopters
🏫 ($getGlobalUserVar[apartment;$mentioned[1;yes]]) Apartments
🏡 ($getGlobalUserVar[house;$mentioned[1;yes]]) Houses
🏰 ($getGlobalUserVar[mansion;$mentioned[1;yes]]) Mansions
<:fish1:906391489179947018> ($getGlobalUserVar[fish;$mentioned[1;yes]]) fish
<:rarefishy:906392100248092712> ($getGlobalUserVar[rare;$mentioned[1;yes]]) rare fish
<:exoticfish:906392196675141662> ($getGlobalUserVar[exotic;$mentioned[1;yes]]) exotic fish
<:legenderyfish:906391360834265129> ($getGlobalUserVar[legendery;$mentioned[1;yes]]) legendery fish
<:hmmmmmmmmm:906392427873570816> ($getGlobalUserVar[pp;$mentioned[1;yes]]) plastic thing
<:fishingpole:906392489747963934> ($getGlobalUserVar[fishingpole;$mentioned[1;yes]]) fishing pole
<:rifile:906391069657292800> ($getGlobalUserVar[gun;$mentioned[1;yes]]) rifile
<:spinner:906391317381283900> ($getGlobalUserVar[spinner;$mentioned[1;yes]]) fidget spinner
<:Stone:909389241547620373> ($getGlobalUserVar[stone;$mentioned[1;yes]]) stone
<:pickaxe:909402020044238860> ($getGlobalUserVar[pickaxe;$mentioned[1;yes]]) pickaxe
<a:shovel:908937674889523220> ($getGlobalUserVar[shovel;$mentioned[1;yes]]) shovel
<:plant:909421404204699679> ($getGlobalUserVar[plant;$mentioned[1;yes]]) plant
`
})

bot.command({
name: "scrap-helicopter",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[22000;29000]];$authorID]
$setGlobalUserVar[helicopter;$sub[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[360;435]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚁 Scrapped]
$description[
Nice $username! You scrapped a helicopter for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[22000;29000]] | 🗡 +$random[360;435]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[helicopter;$authorID]>=1;You need at least 1 \`Helicopter\` in your inventory to scrap]`
})
 
 
bot.command({
name: "scrap-truck",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[16500;22000]];$authorID]
$setGlobalUserVar[truck;$sub[$getGlobalUserVar[truck;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[310;380]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚚 Scrapped]
$description[
Nice $username! You scrapped a truck for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[16500;22000]] | 🗡 +$random[310;380]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[truck;$authorID]>=1;You need at least 1 \`Truck\` in your inventory to scrap]`
})
 
bot.command({
name: "flip-house", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[125000;150000]];$authorID]
$setGlobalUserVar[house;$sub[$getGlobalUserVar[house;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[550;650]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏡 Flipped]
$description[
Nice job $username! You flipped your house and sold it for a profit!
]
$footer[💵 +$$numberSeparator[$random[125000;150000]] | 🗡 +$random[550;650]xp]
$globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[house;$authorID]>=1;You need to have bought at least 1 \`House\` to flip]` 
})
 
bot.command({
name: "flip-apartment", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[70000;95000]];$authorID]
$setGlobalUserVar[apartment;$sub[$getGlobalUserVar[apartment;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[425;525]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏫 Flipped]
$description[
Nice job $username! You flipped your apartment and sold it for a profit!
]
$footer[💵 +$$numberSeparator[$random[70000;95000]] | 🗡 +$random[425;525]xp]
$globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[apartment;$authorID]>=1;You need to have bought at least 1 \`Apartment\` to flip]` 
})
 
bot.command({
name: "sell-fish", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[500;1000]];$authorID]
$setGlobalUserVar[fish;$sub[$getGlobalUserVar[fish;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;100]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a fish]
$description[
you sold a fish for money!
]
$footer[💵 +$$numberSeparator[$random[500;1000]] | 🗡 +$random[50;100]xp]
$globalCooldown[1m;you cant sell that many items to one buyer!]
$onlyIf[$getGlobalUserVar[fish;$authorID]>=1;You need to have fished at least 1 \`fish\` to sell]` 
})

bot.command({
name: "sell-dirt", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[100];500]];$authorID]
$setGlobalUserVar[dirt;$sub[$getGlobalUserVar[dirt;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;100]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a dirt]
$description[
you sold a dirt for money!
]
$footer[💵 +$$numberSeparator[$random[100;500]] | 🗡 +$random[50;100]xp]
$globalCooldown[1m;you cant sell that many items to one buyer!]
$onlyIf[$getGlobalUserVar[dirt;$authorID]>=1;You need to have digged at least 1 \`dirt\` to sell]` 
})

bot.command({
name: "sell-rare-fish", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[120;530]];$authorID]
$setGlobalUserVar[rare;$sub[$getGlobalUserVar[rare;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[55;150]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a rare fish]
$description[
you sold a rare fish for money!
]
$footer[💵 +$$numberSeparator[$random[120;530]] | 🗡 +$random[55;150]xp]
$globalCooldown[1m;you cant sell that many items to one buyer!]
$onlyIf[$getGlobalUserVar[rare;$authorID]>=1;You need to have fished at least 1 \`rare fish\` to sell]` 
})

bot.command({
name: "sell-exotic-fish", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[4000];5000]];$authorID]
$setGlobalUserVar[exotic;$sub[$getGlobalUserVar[exotic;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[1000;1500]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a exotic fish]
$description[
you sold a exotic fish for money!
]
$footer[💵 +$$numberSeparator[$random[4000;5000]] | 🗡 +$random[1000;1500]xp]
$globalCooldown[1m;you cant sell that many items to one buyer!]
$onlyIf[$getGlobalUserVar[exotic;$authorID]>=1;You need to have fished at least 1 \`exotic fish\` to sell]` 
})

bot.command({
name: "sell-legendery-fish", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[5000];10000]];$authorID]
$setGlobalUserVar[legendery;$sub[$getGlobalUserVar[legendery;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[2500;5000]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a legendery fish]
$description[
you sold a legendery fish for money!
]
$footer[💵 +$$numberSeparator[$random[5000;10000]] | 🗡 +$random[2500;5000]xp]
$globalCooldown[1m;you cant sell that many items to one buyer!]
$onlyIf[$getGlobalUserVar[legendery;$authorID]>=1;You need to have fished at least 1 \`legendery fish\` to sell]` 
})

bot.command({
name: "sell-rifile", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[5];10]];$authorID]
$setGlobalUserVar[gun;$sub[$getGlobalUserVar[gun;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[2;5]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a rifile]
$description[
you sold a rifile for money!
]
$footer[💵 +$$numberSeparator[$random[5;10]] | 🗡 +$random[2;5]xp]
$globalCooldown[1m;you cant sell many things to one seller \`%time%\`]
$onlyIf[$getGlobalUserVar[rifile;$authorID]>=1;You need to have at least 1 \`rifile\` to sell]` 
})

bot.command({
name: "sell-spinner", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[50];100]];$authorID]
$setGlobalUserVar[spinner;$sub[$getGlobalUserVar[spinner;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[6;10]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a spinner]
$description[
you sold a spinner for money!
]
$footer[💵 +$$numberSeparator[$random[50;100]] | 🗡 +$random[6;10]xp]
$globalCooldown[1m;you cant sell many things to one seller \`%time%\`]
$onlyIf[$getGlobalUserVar[gun;$authorID]>=1;You need to have at least 1 \`spinner\` to sell]` 
})

bot.command({
name: "sell-fishing-pole", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[50];150]];$authorID]
$setGlobalUserVar[fishingpole;$sub[$getGlobalUserVar[fishingpole;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[25;50]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a fishing pole]
$description[
you sold a fishing pole for money!
]
$footer[💵 +$$numberSeparator[$random[50;150]] | 🗡 +$random[25;50]xp]
$globalCooldown[1m;you cant sell many things to one seller \`%time%\`]
$onlyIf[$getGlobalUserVar[fishing pole;$authorID]>=1;You need to have at least 1 \`fishing pole\` to sell]` 
})

bot.command({
name: "sell-stone", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[100;1000]];$authorID]
$setGlobalUserVar[stone;$sub[$getGlobalUserVar[stone;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;100]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[sold a stone]
$description[
you sold some stone for money!
]
$footer[💵 +$$numberSeparator[$random[100;1000]] | 🗡 +$random[50;100]xp]
$globalCooldown[1m;you cant over feed them with items! They are not money printing people!
$onlyIf[$getGlobalUserVar[stone;$authorID]>=1;You need to have mined at least 1 \`stone\` to sell]` 
})

bot.command({
name: "fish",
code: `$if[$random[1;4]==1]
$color[RANDOM]
$setGlobalUserVar[fish;$sum[$getGlobalUserVar[fish];1]]
$title[$username is fishing]
$description[You fished up a <:fish1:906391489179947018> and you get
$globalCooldown[1m;**⏳ You can fish again in %time%**
$onlyIf[$getGlobalUserVar[fishingpole;$authorID]>=1;You need to have bought at least 1 \`fishing pole\` to fish]]
$else
$if[$random[1;4]==2]
$color[RANDOM]
$setGlobalUserVar[exotic;$sum[$getGlobalUserVar[exotic];1]]
$title[$username is fishing]
$description[You fished up a <:exoticfish:906392196675141662> and you get
$globalCooldown[1m;**⏳ You can fish again in %time%**
$onlyIf[$getGlobalUserVar[fishingpole;$authorID]>=1;You need to have bought at least 1 \`fishing pole\` to fish]]
$else
$if[$random[1;3]==3]
$color[RANDOM]
$setGlobalUserVar[rare;$sum[$getGlobalUserVar[rare];1]]
$title[$username is fishing]
$description[You fished up a <:rarefishy:906392100248092712>
$globalCooldown[1m;**⏳ You can fish again in %time%**
$onlyIf[$getGlobalUserVar[fishingpole;$authorID]>=1;You need to have bought at least 1 \`fishing pole\` to fish]]
$else
$if[$random[1;4]==4]
$color[RANDOM]
$setGlobalUserVar[legendery;$sum[$getGlobalUserVar[legendery];1]]
$title[$username is fishing]
$description[You fished up a <:legenderyfish:906391360834265129> 
$globalCooldown[1m;**⏳ You can fish again in %time%**
$onlyIf[$getGlobalUserVar[fishingpole;$authorID]>=1;You need to have bought at least 1 \`fishing pole\` to fish]]
$endif
$endif
$endif
$endif
`
})
 
bot.command({
name: "dig",
code: `
$if[$random[1;4]==1]




$color[RANDOM]
$setGlobalUserVar[spinner;$sum[$getGlobalUserVar[spinner];1]]
$title[$username is digging]
$description[You dugged up a <:spinner:906391317381283900>
$globalCooldown[1m;**⏳ You can dig again in %time%**
$onlyIf[$getGlobalUserVar[shovel;$authorID]>=1;You need to have bought at least 1 \`shovel\` to dig]]
$else
$if[$random[1;4]==2]
$color[RANDOM]
$setGlobalUserVar[fishingpole;$sum[$getGlobalUserVar[fishingpole];1]]
$title[$username is digging]
$description[You dugged up a <:fishingpole:906392489747963934> and you get $$random[50;1000]]
$globalCooldown[1m;**⏳ You can dig again in %time%**
$onlyIf[$getGlobalUserVar[shovel;$authorID]>=1;You need to have bought at least 1 \`shovel\` to dig]]
$else
$if[$random[1;3]==3]
$color[RANDOM]
$setGlobalUserVar[pp;$sum[$getGlobalUserVar[pp];1]]
$title[$username is digging]
$description[You dugged up a <:hmmmmmmmmm:906392427873570816> and you get $$random[50;1000]]
$globalCooldown[1m;**⏳ You can dig again in %time%**
$onlyIf[$getGlobalUserVar[shovel;$authorID]>=1;You need to have bought at least 1 \`shovel\` to dig]]
$else
$if[$random[1;4]==4]
$color[RANDOM]
$setGlobalUserVar[gun;$sum[$getGlobalUserVar[gun];1]]
$title[$username is digging]
$description[You dugged up a <:rifile:906391069657292800> and you get $$random[50;1000]]
$globalCooldown[1m;**⏳ You can dig again in %time%**
$onlyIf[$getGlobalUserVar[shovel;$authorID]>=1;You need to have bought at least 1 \`shovel\` to dig]]
$endif
$endif
$endif
$endif
`
})

bot.command({
name: "lb-bank",
code: `$title[**__🏦 Bank leaderboard__** 
$globalUserLeaderboard[Bank;asc]]
$color[RANDOM]
$footer[You have $$numberSeparator[$getGlobalUserVar[Bank;$authorID]] 💵 in your bank]`
})
 
 
bot.command({
name: "lb-wallet",
code: `$title[**__👛 Wallet leaderboard__**
$globalUserLeaderboard[Wallet;asc]]
$color[RANDOM]
$footer[You have $$numberSeparator[$getGlobalUserVar[Wallet;$authorID]] 💵 in your wallet]`
})
 
 
//Resets user money for all guilds
bot.command({
name: "reset", 
code: `$resetGlobalUserVar[Wallet]
$resetGlobalUserVar[Bank]
$resetGlobalUserVar[XP]
$title[Reset]
$description[Economy has been reset for all guilds]
$footer[Economy Commands]
$color[RANDOM]
$onlyForIDs[$ownerId;**⛔ You're not the owner of this bot**]` 
})




    
    
    
    
bot.command({
  name: "addemoji",
  aliases: "steal",
  code:`Emoji $addEmoji[https://cdn.discordapp.com/emojis/$replaceText[$replaceText[$checkCondition[$checkContains[$message[1];<]$checkContains[$message[1];:]$checkContains[$message[1];>]==truetruetrue]$isNumber[$message[1]];truefalse;$replaceText[$advancedTextSplit[$message[1];:;3];>;]];falsetrue;$message[1]];$message[2];yes] added with the name -> **$message[2]**
 $onlyIf[$charCount[$message[2]]>=2;⛔ **You must put a longer name over than \`2 chars\`**]
 $onlyIf[$message[2]!=;**Usage**: \`addemoji <emoji | emojiID> <name>\`]
$onlyPerms[manageemojis;**You dont have the permission to use this command**]
$onlyBotPerms[manageemojis;**I dont have the permission to use this command**]
$suppressErrors`
})

  



 

bot.command({
name: "antilink",
code: `$let[e;$apiMessage[;{author:$username[$authorID]#$discriminator[$authorID]:$authorAvatar::}{description:✅ -> \`Enable\`\n\n⛔ -> \`Disable\`\n**Antilink status:** $replaceText[$replaceText[$getServerVar[antilink];true;Enabled];false;Disabled]}{timestamp:ms}{color:#5865F2};{actionRow:Enable,2,1,EnableButton,✅|0|false:Disable,2,1,DisableButton,⛔|0|false};;yes]]
$onlyPerms[admin;Missing permission:\`admin\`]
$onlyBotPerms[admin;Missing permission:\`admin\`]`
})
 
bot.interactionCommand({
 name: "EnableButton",
 prototype:"button",
 code:`$setServerVar[antilink;true]
$interactionReply[;{title:✅ Done}{description:Antilink successfully enabled!}{color:#7BDE3D};;0;7]
$onlyIf[$getServerVar[antilink]==false;$interactionReply[Antilink already enabled!;;;0;4]`
})
 
bot.interactionCommand({
 name: "DisableButton",
 prototype:"button",
 code:`$setServerVar[antilink;false]
$interactionReply[;{title:✅ Done}{description:Antilink successfully disabled!!}{color:#179C33};;0;7]
$onlyIf[$getServerVar[antilink]==true;$interactionReply[Antilink already disabled!;;;0;4]`
})
 
 
bot.command({
name: "$alwaysExecute",
code: `
$deleteIn[5s]
<@$authorID>, \`You can't send links here!\` ***Reason***:**Antilink Enabled.**
$deletecommand
$onlyIf[$checkContains[$message;https#COLON#://;http#COLON#//;discord.gg/;https://discord.gg/]==true;]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==false;]
 $onlyIf[$getServerVar[antilink]==true;] 
`})



bot.command({
name: "removerole",
code: `$color[RANDOM]
$takeRoles[$mentioned[1];$mentionedRoles[1]]
$title[Removed role to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has taken <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
name: "giverole",
aliases: ['role' , 'grole'],
code: `$color[RANDOM]
$giveRoles[$mentioned[1];$mentionedRoles[1]]
$title[Role given to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has given <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
  name: "temprole",
  code: `
$channelSendMessage[$channelID;<@$mentioned[1]>, I removed the $roleName[$findRole[$message[2]]] role, time's up]
$takeRoles[$mentioned[1];$findRole[$message[2]]]
$wait[$replaceText[$replaceText[$checkCondition[$message[3]==];true;24d];false;$message[3]]]
$channelSendMessage[$channelID;{description::white_check_mark: | $username[$mentioned[1]]#$discriminator[$mentioned[1]] has been given the $roleName[$findRole[$message[2]]] role. For \`$replaceText[$replaceText[$checkCondition[$message[3]==];true;undefined time];false;$message[3]]\`}{color:RANDOM}]
$giveRoles[$mentioned[1];$findRole[$message[2]]]
$suppressErrors[{title:An error occured}{description:Looks like I can't find the role}{color:RED}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than me on role position]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than you on role position.]
$argsCheck[>3;Incorrect arguments. Example: temprole @user @role]
$onlyPerms[manageroles;{title:Missing Permissions}{color:RANDOM}{description:You don't have \`MANAGE_ROLES\` permissions to use this command}]`
})




bot.deletedCommand({
 channel: "$channelID",
 code: `$setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]
 $setChannelVar[snipe_channel;$channelID]
 $setChannelVar[snipe_date;$day $month $year - $hour:$minute]`
});
bot.onMessageDelete();
 
bot.command({
name: "snipe",
code: `$color[RANDOM]
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]`
})
 
bot.command({
name: "quote",
code: ` $author[$userTag[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]];$userAvatar[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]]]
$description[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];content]
 
[Jump to message\\]($replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$message];false;https://discord.com/channels/$guildID/$mentionedChannels[1;yes]/$noMentionMessage])]
$textSplit[$message;/]
$color[RANDOM]
$suppressErrors[**⛔ Could not find message**]`
})
 
 
bot.updateCommand({
 channel: "$channelID",
 code: `$setChannelVar[msgEditorID;$authorID]
 $setChannelVar[esnipeOldMsg;$oldMessage]`
})
bot.onMessageUpdate();
 
bot.command({
 name: "editsnipe",
 aliases: ["esnipe"],
 code: `$author[$username[$getChannelVar[msgEditorID]]#$discriminator[$getChannelVar[msgEditorID]];$userAvatar[$getChannelVar[msgEditorID]]]
$description[$getChannelVar[esnipeOldMsg]]
$addTimestamp
$color[RANDOM]
$onlyIf[$getChannelVar[esnipeOldMsg]!=undefinied;{description: there is nothing to snipe}{color: RED}]
$onlyIf[$getChannelVar[msgEditorID]!=undefinied;{description: there is nothing to snipe}{color: RED}]
$suppressErrors[There is nothing to snipe]`
})















bot.command({
  name: "ban",
  code: `$author[$userTag[$findUser[$message[1];no]] has been banned;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[FF0000]
  $addTimestamp
  $ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't ban yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't ban the owner of the server]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user was already banned from the server]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't ban me with myself]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
  $argsCheck[1;Invalid command usage, try using it like:
ban [member] (optional reason)
 
Example:
ban @user/ID optional reason]
  $onlyBotPerms[ban;I need \`Ban\` permission to do this]
  $onlyPerms[ban;you need \`Ban\` permission to do this]
  $suppressErrors[user not found]`
})
bot.command({
  name: "kick",
  code: `$author[$userTag[$findUser[$message[1];no]] has been kicked;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[ffd84d]
  $addTimestamp
  $kick[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user is banned from the server]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't kick me with myself]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't kick yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't kick the owner of the server]
   $argsCheck[1;❌ **incorrect usage**
  
  ✅ correct usage: kick @user/ID optional reason]
   $onlyBotPerms[kick;I need \`Kick\` permission to do this]
  $onlyPerms[ban;you need \`Kick\` permission to do this]
  $suppressErrors[user not found]`
})
bot.command({
  name: "setmuterole",
  aliases: "setmute",
  code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $description[the <@&$findRole[$message[1]]> role has been established as a mute role]
  $color[$getRoleColor[$findRole[$message[1]]]]
  $addTimestamp
  $setServerVar[mute;$findRole[$message[1]];$guildID]
  $onlyIf[$roleExists[$findRole[$message[1]]]==true;that role doesn't exist]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$message[1]]];my highest role is lower than the role you choose]
  $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
  $suppressErrors[role not found]`
  })
  bot.command({
  name: "mute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been muted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $giveRole[$findUser[$message[1];no];$getServerVar[mute]]
    $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to mute is higher than my highest role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
  $onlyIf[$hasRole[$findUser[$message[1];$getServerVar[mute]]]==false;this user was already muted]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: unmute @user/ID optional reason]
    $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to mute the user]`
})
bot.command({
  name: "unmute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been unmuted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $takeRole[$findUser[$message[1];no];$getServerVar[mute]]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to unmute is higher than my highest role]
 
$onlyIf[$hasRole[$findUser[$message[1];no];$getServerVar[mute]]==true;this user is not muted]
  $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
    $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
    $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: unmute @user/ID optional reason]
$onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to unmute the user]`
})
bot.command({
  name: "warn",
  code: `$author[$userTag[$findUser[$message[1];no]] has been warned;$userAvatar[$findUser[$message[1];no]]]
  $title[**Moderator:** $userTag[$authorID]]
  $description[**Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[RANDOM]
  $addTimestamp
  $setUserVar[warn;$sum[$getUserVar[warn;$findUser[$message[1];no]];1];$findUser[$message[1];no]]
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;you can't warn bots]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't warn the owner of the server]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't warn yourself]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: warn @user/ID optional reason]
  $onlyPerms[kick;you need \`Kick\` permission]
  $suppressErrors[user not found]`
})
bot.command({
  name: "infractions",
  code: `$author[$userTag[$findUser[$message[1];no]];$userAvatar[$findUser[$message[1];no]]]
  $title[Have: $getUserVar[warn;$findUser[$message[1]]] infractions]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: infractions @user/ID]
  $suppressErrors[user not found]`
})
bot.command({
  name: "tempmute",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$giveRole[$findUser[$message[1]];$getServerVar[mute]]
$setTimeout[$message[2];userID: $findUser[$message[1]]
serverID: $guildID]
$onlyIf[$hasRole[$findUser[$message[1]];$getServerVar[mute]]==false;this user was already muted]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
$onlyIf[$getServerVar[mute]!=;you didn't set the mute role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't mute the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't mute me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: tempmute @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: tempmute @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[manageroles;I need \`Manage roles\` permission]
$onlyPerms[manageroles;you need \`Manage roles\` permission]`
})
bot.command({
  name: "tempban",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$setTimeout[$message[2];userID2: $findUser[$message[1]]
reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$onlyIf[$isBanned[$findUser[$message[1]]]==false;this user was already banned]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't ban the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't ban me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: tempban @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: tempban @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[ban;I need \`Ban\` permission]
$onlyPerms[ban;you need \`Ban\` permission]`
})
bot.command({
  name: "clear",
  aliases: "purge",
  code: `$author[$userTag[$authorID];$authorAvatar]
  $title[successfully deleted $message[1] $replaceText[$replaceText[$checkCondition[$message[1]>1];true;messages];false;message]]
  $color[RANDOM]
  $addTimestamp
 
$clear[$message[1]]
  $onlyIf[$checkContains[$message[1];-]==false;you can use negative numbers, stop trying to break me smh]
  $onlyIf[$message[1]=>1;you can only clear more than 1 message]
  $argsCheck[>1;❌ incorrect usage
  
  ✅ correct usage: clear <number>]
  $onlyPerms[managemessages;you need \`Manage messages\` permission]
  $onlyBotPerms[managemessages;I need \`Manage messages\` permission]
$suppressErrors[failed to clear the messages]`
})
bot.command({
  name: "clearwarns",
code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $title[$message[last] warnings cleared from $userTag[$findUser[$message[1];no]]]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $onlyPerms[kick;you need \`Kick\` permission]
  $onlyIf[$isNumber[$message[last]]==true;please write a valid number of warnings to clean from the user]
  $onlyIf[$getUserVar[warn;$findUser[$message[1]]]<=$message[last];the user does not have that amount of warnings to clean]
  $onlyIf[$checkContains[$message[last];-]==false;please write a valid **positive number** of warnings to clean from the user]
    $setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message[1];no]];$message[last]];$findUser[$message[1];no]]
  $argsCheck[>1;❌ **incorrect usage**
 
  ✅ correct usage: clearwarnings @user/ID (number)]
  $argsCheck[>2;❌ **incorrect usage**
 
  ✅ correct usage: clearwarnings @user/ID (number)]
  $suppressErrors[failed to clear the warnings]`
})
 

 
bot.timeoutCommand({
 
 
code: `$sendDM[$timeoutdata[userID2];you have been unbanned in $serverName[$timeoutdata[serverID]]]
$unban[$timeoutdata[userID2]]`
 
})
 
bot.timeoutCommand({
 
code: `$sendDM[$timeoutdata[userID];you have been unmuted in $serverName[$timeoutdata[serverID]]]
$takeRole[$timeoutdata[userID];$getServerVar[mute;$timeoutdata[serverID]]]`
 
})



 
bot.awaitedCommand({
name: "massfilter",
code: `$setUserVar[reactmessageid;;$clientID]
$resetServerVar[durationcache]
$resetServerVar[filters]
$suppressErrors`
})

bot.interactionCommand({
name: "filter",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
29 ) 3d, 8d, 8d-v2, double, delay, chorus, clarity, deep, distorted, echo, earwax, fan, flanger, gate, half, high, low, mid, nightcore, nightcore-normal, phaser, pulsator, pulsator-2x, purebass, space, surround, vaporwave, vibrato, vibrato-2x
2  ) all, clear
\`\`\`]
$addField[Filters;$getServerVar[filters];no]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$toLowercase[$message[1]]==nightcore]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:0.775;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore} {color:$getVar[color]}]
$setServerVar[filters;Nightcore]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==surround]
$songFilter[phaser:0;flanger:0;gate:0;surround:1;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[300ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Surround} {color:$getVar[color]}]
$setServerVar[filters;Surround]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==flanger]
$songFilter[phaser:0;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Flanger} {color:$getVar[color]}]
$setServerVar[filters;Flanger]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==gate]
$songFilter[phaser:0;flanger:0;gate:1;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Gate} {color:$getVar[color]}]
$setServerVar[filters;Gate]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chorus]
$songFilter[phaser:1;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chorus} {color:$getVar[color]}]
$setServerVar[filters;Chorus]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clear]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==phaser]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Phaser} {color:$getVar[color]}]
$setServerVar[filters;Phaser]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==earwax]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:1;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Earwax} {color:$getVar[color]}]
$setServerVar[filters;Earwax]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==echo]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:100;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Echo} {color:$getVar[color]}]
$setServerVar[filters;Echo]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.5;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator} {color:$getVar[color]}]
$setServerVar[filters;Pulsator]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:2;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator 2x} {color:$getVar[color]}]
$setServerVar[filters;Pulsator 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==distorted]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:99;pulsator:0;vibrato:0]
$songFilter[contrast:99]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Distorted} {color:$getVar[color]}]
$setServerVar[filters;Distorted]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato} {color:$getVar[color]}]
$setServerVar[filters;Vibrato]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.6]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato 2x} {color:$getVar[color]}]
$setServerVar[filters;Vibrato 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==space]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Space} {color:$getVar[color]}]
$setServerVar[filters;Space]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==all]
$songFilter[phaser:1;flanger:1;gate:1;surround:1;bass:10;pitch:1.1;speed:1.1;earwax:1;echo:100;contrast:99;pulsator:0.125;vibrato:0.3]
Applying..
$editIn[2s;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = All} {color:$getVar[color]}]
$setServerVar[filters;All]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==deep]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:-3;pitch:0.9;speed:1.1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
$songFilter[pitch:0.9;speed:1.1;bass:-3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Deep} {color:$getVar[color]}]
$setServerVar[filters;Deep]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==3d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.125;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 3D} {color:$getVar[color]}]
$setServerVar[filters;3D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:30;contrast:0;pulsator:0.08;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D} {color:$getVar[color]}]
$setServerVar[filters;8D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clarity]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Clarity} {color:$getVar[color]}]
$setServerVar[filters;Clarity]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==nightcore-normal]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore Normal} {color:$getVar[color]}]
$setServerVar[filters;Nightcore Normal]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==half]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:0.5;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Half} {color:$getVar[color]}]
$setServerVar[filters;Half]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==double]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:2;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Double} {color:$getVar[color]}]
$setServerVar[filters;Double]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==fan]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:25;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Fan} {color:$getVar[color]}]
$setServerVar[filters;Fan]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==purebass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:20;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Purebass} {color:$getVar[color]}]
$setServerVar[filters;Purebass]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==low]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Low} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.05;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Low]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==mid]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Mid} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.2;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Mid]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==high]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = High} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.07;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;High]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==delay]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Delay} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1000;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Delay]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d-v2]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D V2} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;echo:0.1;contrast:0;pulsator:0.15;vibrato:0;earwax:1]
$setServerVar[filters;8D V2]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseIf[$toLowercase[$replaceText[$message[1];-; ]]==$toLowercase[$getServerVar[filters]]]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vaporwave]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vaporwave} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0.875;speed:1;echo:0;contrast:0;pulsator:0;vibrato:0;earwax:0]
$setServerVar[filters;Vaporwave]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$else
There no filter \`$message\`.
$endif
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$cooldown[$commandInfo[filter;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$interactionReply[\`$userTag[$authorID]\` using slash.]
$suppressErrors`
})

bot.interactionCommand({
name: "play",
code: `$if[$queueLength<1]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$getServerVar[filters]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[play;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]
$suppressErrors[something just happened.]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "pause",
code: `$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[pause]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏸]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[durationcache;$splitText[1]]
$textSplit[$songInfo[current_duration]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[pause;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "resume",
code: `$if[$getServerVar[durationcache]==0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[resume]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[▶]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[resume;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "stop",
code: `$setServerVar[durationcache;0]
$setServerVar[filters;none]
$stopSong
$if[$getGlobalUserVar[controlreact]==0]
$sendMessage[$getVar[stop];no]
$elseIf[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏹]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "loop",
code: `$setServerVar[durationcache;0]
$setServerVar[filters;none]
$loopSong
$if[$getGlobalUserVar[controlreact]==0]
$sendMessage[$getVar[loop];no]
$elseIf[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏹]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "botinfo",
code: `$title[Botinfo ($username[$clientID])
    $color[RANDOM]
    $thumbnail[$userAvatar[$clientID]]
    $addField[RAM; $ramMB]
    $addField[CPU Usage; $cpu/100]
    $addField[Ping; $pingms]
    $addField[Uptime;$uptime]
    $addField[Commands; $commandsCount]
    $addField[Users;$allMembersCount]
    $addField[Channels;$allChannelsCount]
    $addField[Servers;$serverCount]
    $addField[Version;5.0.4]
    $addField[Created;$creationDate[$clientID]]
    $addField[Developer;$userTag[$botOwnerID]]
$addfield[$djsEval[require ('os').platform();yes];yes]]
    $addTimestamp
    $cooldown[5s;{description:A bit too fast there. Wait for **%time%**!}{color:#2f3136}
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
 name: "clear",
  aliases: "purge",
  code: `$author[$userTag[$authorID];$authorAvatar]
  $title[successfully deleted $message[1] $replaceText[$replaceText[$checkCondition[$message[1]>1];true;messages];false;message]]
  $color[RANDOM]
  $addTimestamp
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
  name: "afk",
  code: `
    $title[Set your status to afk!]
    $description[Reason: $noMentionMessage]
    $color[#206694]
    $setUserVar[afk;AFK;$authorID]
    $setUserVar[reason;$noMentionMessage]  
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})                                                                                                          

bot.interactionCommand({
    name: "uptime",
    code: `$title[My uptime and usage]
$color[#2C2F33]
    $description[
    $addfield[RAM; $ramMB]
    $addfield[CPU Usage; $cpu/100]
    $addfield[Ping; $pingms]
   $addfield[Uptime;$uptime]                                                                                                                
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})                                                                                                                        
  
bot.interactionCommand({
     name: "help",
    code: `
    $buttonCollector[$get[id];$authorID;1m;1,2,3,4,5,6,7,8,0;await1,await2,await3,await4,await5,await6,await7,await0;Only $userName can use this interaction,,64]
       $let[id;$apiMessage[$channelId;;{title:Help}{description:
    
  }
{color:RANDOM}{footer: Page 0/7};{actionRow:Previous Page,2,1,0,,true:Next Page,2,1,1,,false};;yes]]`,
}, {
    type: "awaitedCommand",
    name: "await1",
    code: `$interactionReply[;{title:<:leveling:896951309809365024> Leveling Commands} {description:set-levelling ¦ Enable level system.
set-card ¦ Set the rank background.
level-message ¦ make a level up message!
level-role ¦ set a level role.
rank ¦ show your rank our someones.
set-rank ¦ set your rank.
      }{color:RANDOM}{footer: Page 1/7};{actionRow:Previous Page,2,1,await0,,false:Next Page,2,1,2,,false};;7]`},
                 {
    type: "awaitedCommand",
    name: "await2",
    code: `$interactionReply[;{title:<:economy:898404177955401759> Economy Commands} {description:work ¦ work for money
beg ¦ beg for money
bal ¦ balance
profile ¦ show ur profile
deposit ¦ deposit money
withdraw ¦ withdrawl some cash
daily ¦ get daily money
heist ¦ heist
give money ¦ give some money
shop ¦ buy some stuff
rob ¦ rob a user
steal ¦ steal money
search ¦ search items
scrap-car ¦ scrap a car for money
scrap-truck ¦ scrap a truch for more money
scrap-helicopter ¦ scrap a helicopter for even more money
flip-house ¦ flip a house for money
flip-apartment ¦ flip a apartment for even more money
lb-bank ¦ bank leaderboard
lb-wallet ¦ wallet leaderboard
reset ¦ reset money in all guilds
dig ¦ dig for money
fish ¦ fish for money
mine ¦ mining is over powered
inventory ¦ shows ur inventory
 
}{color:RANDOM}{footer: Page 2/7};{actionRow:Previous Page,2,1,1,,false:Next Page,2,1,3,,false};;7]`},
                 {
    type: "awaitedCommand",
    name: "await3",
    code: `$interactionReply[;{title:<:music:896761748676280401> Music Commands} {description:play ¦ Play a song.
playskip  ¦ skip the playing song
pause ¦ pause
resume ¦ resume a song
stop ¦ stop the song
nowplaying ¦ the songs thats playing
loop ¦ loop
shuffle ¦ shuffle
shuffleskip ¦ skip the suffle
pruning ¦ pruning
skip ¦ skip
clearqueue ¦ clear queue
queue ¦ queue
qloop ¦ qloop
seek ¦  seek
remove ¦ remove 
volume ¦ volume
filter ¦ filter
musicsettings ¦ musicsettings

> playlist

playlist
playlist-add
playlist-remove
playlist-play


}{color:RANDOM}{footer:Page 3/7};{actionRow:Previous page,2,1,2,,false:Next Page,2,1,4,,false};;7]`},{
    type: "awaitedCommand",
    name: "await4",
    code: `$interactionReply[;{title:<:fun:907137201014472724> Fun Commands} {description:guess ¦ Play guess the number.
quote ¦ Quote a message.
editsnipe ¦ Check edited messages.
snipe ¦ Snipe recently deleted messages.
addemoji ¦ Add an emoji.
func ¦ Check aoi.js commandlist.
hack ¦ Hack a user.
jumbo ¦ Enlarge an emote.
8ball ¦ Ask the 8ball questions.
info ¦ Check users info.
avatar ¦ See users avatar
invite ¦ Invite me.
botinfo ¦ bot info
say ¦ make the bot say something

       }{color:RANDOM}{footer: Page 4/7};{actionRow:Previous Page,2,1,3,,false:Next Page,2,1,5,,false};;7]`},
                 {
     type: "awaitedCommand",
    name: "await5",
    code: `$interactionReply[;{title:<:slashcommands:899663302395846726> Slash Commands}{description:not added yet

        
       }{color:RANDOM}{footer: Page 5/7};{actionRow:Previous Page,2,1,4,,false:Next Page,2,1,6,,false};;7]
`},{
    type: "awaitedCommand",
    name: "await6",
    code: `
$interactionReply[;{title:<:moderation:905787390302490624> Admin Only Commands} {description:ban ¦ Ban a user.
banalt ¦ Bans a account if younger than 30d.
kick ¦ Kick a user.
setmute ¦ Set the muterole.
mute ¦ Mute a user.
unmute ¦ Unmute a user.
tempmute ¦ Temporarily mute a user.
warn ¦ Warn a user.
infractions ¦ Check user infractions.
clear ¦ Clear messages.
tempban ¦ Temporarily ban a user.
clearwarns ¦ Clear user's warnings.
role ¦ Role a user.
removerole ¦ Remove a user's role.
temprole 
prefix 
 
}
 {color:RANDOM}{footer: Page 6/7};{actionRow:Previous Page,2,1,5,,false:Next Page,2,1,7,,false};;7]
$onlyPerms[admin;<@!$authorID> {title:Admin only} {description:Only admins can see  these commands}]`
                 }, {
    type: "awaitedCommand",
    name: "await7",
    code: `
$interactionReply[;{title:<:dev:906193805466808380> Developer Only} {description:reboot ¦ reboot the bot
eval ¦ hmmmmmmm
**
Developer Only Commands 
**
       }{color:RANDOM}{footer: Page 7/7};{actionRow:Previous Page,2,1,6,,false:Next Page,2,1,0,,true};;7]
$onlyForIDs[$ownerID;<@!$authorID> {title:Developer only} {description:Only my Developer can see these commands}]`
              },{
  type: "awaitedCommand",
    name: "await0",
    code: `$interactionReply[;{title:Help}{description:
    }
{color:RANDOM}{footer: Page 0/7};{actionRow:Previous Page 1,2,1,2,,true:Next Page,2,1,1,,false};;yes]                                                          $interactionReply[$interactionReply[\`$userTag[$authorID]\` using slash.]`
})                                                              
                                                                                                                

bot.musicStartCommand({
  channel: "$channelID",
  code: `$if[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==true-true]
$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$author[Started Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[Ping;\`$dbPingms\`;yes]
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)];yes]
$addField[URL;[Song]($songInfo[url] "$songInfo[title]");yes] 
$addField[Volume;\`$volume%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$textSplit[$songInfo[duration]; ]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$elseIf[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==false-true]
$setUserVar[reactmessageid;$get[a];$clientID]
$reactionCollector[$get[a];$songInfo[userID];1d;🔄,⏯,⏹,⏭,🔁,🔀;clearqueueyes,resume-pause,stop,skip,loop,recentshuffle;yes]
$wait[$ping]
$let[a;$sendMessage[{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]};yes]]
$textSplit[$songInfo[duration]; ]
$onlyIf[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==false;{execute:recentskipplay}]
$endelseif
$endif
$onlyIf[$getGlobalUserVar[logmusic;$songInfo[userID]]!=1;]
$volume[$getGlobalUserVar[vol;$songInfo[userID]]]
$setGlobalUserVar[userused;$sum[$getGlobalUserVar[userused;$songInfo[userID]];1];$songInfo[userID]]`
});

bot.awaitedCommand({
name: "recentplay",
code: `$editMessage[$getUserVar[reactmessageid;$clientID];{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]\`
\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]}]
$textSplit[$songInfo[duration] $songInfo[current_duration]; ]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})

bot.awaitedCommand({
name: "recentskipplay",
code: `$editMessage[$getUserVar[reactmessageid;$clientID];{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]}]
$textSplit[$songInfo[duration]; ]`
})

bot.awaitedCommand({
name: "recentshuffle",
code: `$loop[1;recentplay]
$wait[2s]
$editMessage[$getUserVar[reactmessageid;$clientID];{author:Shuffle Queue:$getVar[customemoji1]} {field:Requested By:<@$authorID>:yes} {field:Song:\`$numberSeparator[$queueLength]\`:yes} {description:\`$cropText[$queue[1;$queueLength;{number} - {title}];2000]\`} {color:$getVar[color]} {footer:Redirecting..} {timestamp}]
$shuffleQueue
$onlyIf[$queueLength>1;Only have 1 song. {delete:2s}]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `$if[$getGlobalUserVar[saveseek;$songInfo[userID]]!=0]
$setGlobalUserVar[saveseek;0;$songInfo[userID]]
$sendMessage[{description:Seek recently to $humanizeMS[$multi[$getGlobalUserVar[saveseek;$songInfo[userID]];1000];10]} {color:$getVar[color]} {timestamp};no]
$seekTo[$getGlobalUserVar[saveseek;$songInfo[userID]]]
$endif
$if[$getGlobalUserVar[vol;$songInfo[userID]]>=$sum[$getServerVar[maxvol];1]]]
$setGlobalUserVar[vol;50;$songInfo[userID]]
$volume[50]
$sendMessage[{title:Volume User was change to 50%.} {footer:Bypass limit Max Volume Server} {color:$getVar[color]} {delete:5s};no]
$endif
$suppressErrors`
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `$if[$isDeafened[$clientID]==true]
$deafenUser[$clientID;yes]
$onlyBotPerms[deafenmembers;]
$else
$endif
$if[$checkContains[$songInfo[url];https://youtube.com/]==true]
$setServerVar[linkdownload;https://api.vevioz.com/?v=$replaceText[$songInfo[url];https://youtube.com/watch?v=;]&type=mp3&bitrate=320]
$else
$setServerVar[linkdownload;$jsonRequest[$jsonRequest[https://api.leref.ga/soundcloud?url=$songInfo[url];songInfo.trackURL]?client_id=$getVar[clientidsoundcloud];url]]
$wait[1s]
$onlyIf[$getVar[clientidsoundcloud]!=;]
$endif
$if[$getUserVar[nontrigger;$clientID]==1]
$setUserVar[nontrigger;0;$clientID]
$endif
$suppressErrors`
})

bot.musicEndCommand({
  channel: "$channelID",
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$setServerVar[filters;none]
$title[There no song again on queue.]
$footer[Left VC.]
$color[$getVar[color]]`
});

bot.awaitedCommand({
name: "clearqueueyes",
code: `$setServerVar[durationcache;0]
$clearSongQueue
$pauseSong
$editIn[2ms;{description:$replaceText[$getVar[clearsong];{amount};$queueLength]} {color:$getVar[color]} {timestamp}] ⚠️ Clearing...
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$setServerVar[filters;none (temporary)]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;]`
});

bot.awaitedCommand({
name: "clearqueueno",
code: `$description[Clearing was cancelled.]
$color[$getVar[color]]
$addTimestamp
$deleteIn[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]`
});

bot.awaitedCommand({
name: "top",
code: `$deletecommand
$title[Top Playing Song]
$description[$globalUserLeaderboard[userused;asc;\`) {top} {username} - {value}\`]]
$color[$getVar[color]]
$addTimestamp`
})

bot.awaitedCommand({
name: "resume-pause",
code: `$loop[1;recentplay]
$if[$queueStatus==paused]
$if[$getServerVar[durationcache]==0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$else
$setServerVar[durationcache;$splitText[1]]
$pauseSong
$textSplit[$songInfo[current_duration]; ]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;]`
})

bot.awaitedCommand({
name: "loop",
code: `$loop[1;recentplay]
$if[$loopStatus==none]
$let[a;$loopSong]
$elseIf[$loopStatus==song]
$let[b;$loopQueue]
$let[a;$loopSong]
$endelseif
$elseIf[$loopStatus==queue]
$let[b;$loopQueue]
$endelseif
$else
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;]
$suppressErrors`
})

bot.awaitedCommand({
name: "stop",
code: `$setServerVar[durationcache;0]
$setServerVar[filters;none]
$stopSong
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]`
})

bot.awaitedCommand({
name: "skip",
code: `$setUserVar[nontrigger;1;$clientID]
$skipSong
$editMessage[$getUserVar[reactmessageid;$clientID];{title:$replaceText[$getVar[skip];{song};$songInfo[title]]}
{thumbnail:$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]}
{field:Starting Playing:\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`:yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
{field:Position:\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{timestamp}
{color:$getVar[color]}]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have 1 song. {delete:2s}]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})

bot.command({
  name: "play",
  aliases: ["youtube", "p", "yt"],
  cooldown: "3s",
  code: `$if[$queueLength<1]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$if[$checkContains[$message;https://cdn.discordapp.com/attachments/]==true]
$let[song;$playSong[$uri[decode;$splitText[7]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$textSplit[$message;/]
$elseIf[$checkContains[$message;https://soundcloud.com/]==true]
$let[song;$playSoundcloud[$message;$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$endelseif
$else
$let[song;$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$endif
$joinVC[$voiceID]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[play;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "playskip",
  aliases: ["ps"],
  cooldown: "3s",
  code: `$if[$checkContains[$getGlobalUserVar[logmusic];0;1]==false]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$skipTo[$sub[$queueLength;1]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[logmusic];0;2];true;Starting Playing: \`$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]\`];false;]]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[playskip;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$queueLength>=1;Require **1 song** to run it.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "soundcloud",
  aliases: ["sc"],
  cooldown: "3s",
  code: `$if[$queueLength<1]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$message;$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[soundcloud;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please put link song that from soundcloud.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "download",
  cooldown: "3s",
  code: `$if[$checkContains[$songInfo[url] $suppressErrors;https://soundcloud.com/]==true]
$attachment[$getServerVar[linkdownload];$cropText[$songInfo[title];28]_128_Bitrate.mp3]
$onlyIf[$checkContains[$getServerVar[linkdownload];playlist.m3u8]!=true;no download song available.]
$endif
$if[$toLowercase[$message]==]
$color[$getVar[color]]
$image[attachment://$random[1000;1000000]-thumbnail.png]
$attachment[$songInfo[thumbnail];$random[1000;1000000]-thumbnail.png]
$sendMessage[Downloading..;no]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseIf[$toLowercase[$message]==--refresh]
$addCmdReactions[✅]
$setServerVar[linkdownload;$jsonRequest[$jsonRequest[https://api.leref.ga/soundcloud?url=$songInfo[url];songInfo.trackURL]?client_id=$getVar[clientidsoundcloud];url]]
$onlyIf[$checkContains[$songInfo[url];https://soundcloud.com/]!=false;Only for SoundCloud.]
$endelseif
$endif
$onlyBotPerms[attachfiles;Missing Permission **Attach Files** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[$commandInfo[download;cooldown];Please wait **%time%** before using again.]`
})

bot.command({
 name: "musicsettings",
 aliases: ["musicsetting", "musicset"],
 cooldown: "3s",
 code: `$if[$message[1]==]
$addField[Max Volume;> \`$getServerVar[maxvol]%\`
> (musicsettings maxvol <value>);yes]
$addField[Stay VC;> \`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;off];1;on];2;on - 24/7]\`
> (musicsettings stay);yes]
$addField[React Only;> \`$replaceText[$replaceText[$getGlobalUserVar[controlreact];0;off];1;on]\`
> (musicsettings react);yes]
$addField[Log Music;> \`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[logmusic];1;off];2;on - reaction];0;on]\`
> (musicsettings log);yes]
$color[$getVar[color]]
$footer[Inspiration by DisTube]
$addTimestamp
$thumbnail[$userAvatar[$clientID;1024]]
$elseIf[$message[1]==log]
$if[$getGlobalUserVar[logmusic]==1]
$setGlobalUserVar[logmusic;0]
$title[Log music: **enable**]
$color[$getVar[color]]
$addTimestamp
$elseIf[$getGlobalUserVar[logmusic]==0]
$setGlobalUserVar[logmusic;2]
$title[Log music: **enable** (with reaction control)]
$color[$getVar[color]]
$addTimestamp
$endelseif
$elseIf[$getGlobalUserVar[logmusic]==2]
$setGlobalUserVar[logmusic;1]
$title[Log music: **disable**]
$color[$getVar[color]]
$addTimestamp
$endelseif
$endif
$endelseif
$elseIf[$message[1]==react]
$if[$getGlobalUserVar[controlreact]==0]
$description[Command for \`pause, resume, stop, loop, join, disconnect, shuffle, shuffleskip\` will be only return reaction.]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[controlreact;1]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$elseIf[$getGlobalUserVar[controlreact]==1]
$description[Disabled.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[controlreact;0]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$endelseif
$endif
$endelseif
$elseIf[$message[1]==stay]
$if[$getGlobalUserVar[247]==2]
$title[Off. Now no longer to be stay on voice channel.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[247;0]
$elseif[$getGlobalUserVar[247]==0]
$title[On. Will be stay **2 minutes** on voice channel.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[247;1]
$endelseif
$elseif[$getGlobalUserVar[247]==1]
$title[On. Will be stay **24/7** on voice channel.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[247;2]
$endelseif
$endif
$endelseif
$elseIf[$message[1]==maxvol]
$if[$message[2]==]
$author[$serverName]
$footer[Current Max Volume: $getServerVar[maxvol]%;$serverIcon[$guildID;128]]
$color[$getVar[color]]
$elseIf[$message[2]!=]
$setServerVar[maxvol;$message[2]]
$title[Changed to \`$message[2]%\`]
$addTimestamp
$color[$getVar[color]]
$onlyIf[$message[2]<=501;Max volume just **500%**]
$onlyIf[$checkContains[$message[3];-]!=true;You cant set to negative.]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]
$onlyIf[$message[2]!=;]
$endelseif
$endif
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[musicsettings;cooldown];Please wait **%time%** before using again.]`
})

bot.command({
name: "filter",
cooldown: "3s",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
3  ) bass, pitch, speed
29 ) 3d, 8d, 8d-v2, double, delay, chorus, clarity, deep, distorted, echo, earwax, fan, flanger, gate, half, high, low, mid, nightcore, nightcore-normal, phaser, pulsator, pulsator-2x, purebass, space, surround, vaporwave, vibrato, vibrato-2x
2  ) all, clear
\`\`\`]
$addField[Filters;$getServerVar[filters];no]
$footer[Usage: filter <filter> (value optional)]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$toLowercase[$message[1]]==nightcore]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:0.775;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore} {color:$getVar[color]}]
$setServerVar[filters;Nightcore]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==bass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5];pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Bass | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5] dB} {color:$getVar[color]}]
$setServerVar[filters;Bass | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]<=20;Max. **20**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]>=-20;Min. **-20**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==surround]
$songFilter[phaser:0;flanger:0;gate:0;surround:1;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[300ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Surround} {color:$getVar[color]}]
$setServerVar[filters;Surround]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==flanger]
$songFilter[phaser:0;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Flanger} {color:$getVar[color]}]
$setServerVar[filters;Flanger]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==gate]
$songFilter[phaser:0;flanger:0;gate:1;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Gate} {color:$getVar[color]}]
$setServerVar[filters;Gate]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chorus]
$songFilter[phaser:1;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chorus} {color:$getVar[color]}]
$setServerVar[filters;Chorus]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clear]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==phaser]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Phaser} {color:$getVar[color]}]
$setServerVar[filters;Phaser]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==earwax]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:1;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Earwax} {color:$getVar[color]}]
$setServerVar[filters;Earwax]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pitch]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1];speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pitch | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]} {color:$getVar[color]}]
$setServerVar[filters;Pitch | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]<=1.9;Max. **1.9**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]>0.09;Min. **0.1**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==speed]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1];earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Speed | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]} {color:$getVar[color]}]
$setServerVar[filters;Speed | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]<=9.9;Max. **9.9**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]>0.4;Min. **0.5**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==echo]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:100;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Echo} {color:$getVar[color]}]
$setServerVar[filters;Echo]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.5;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator} {color:$getVar[color]}]
$setServerVar[filters;Pulsator]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:2;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator 2x} {color:$getVar[color]}]
$setServerVar[filters;Pulsator 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==distorted]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:99;pulsator:0;vibrato:0]
$songFilter[contrast:99]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Distorted} {color:$getVar[color]}]
$setServerVar[filters;Distorted]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato} {color:$getVar[color]}]
$setServerVar[filters;Vibrato]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.6]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato 2x} {color:$getVar[color]}]
$setServerVar[filters;Vibrato 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==space]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Space} {color:$getVar[color]}]
$setServerVar[filters;Space]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==all]
$songFilter[phaser:1;flanger:1;gate:1;surround:1;bass:10;pitch:1.1;speed:1.1;earwax:1;echo:100;contrast:99;pulsator:0.125;vibrato:0.3]
Applying..
$editIn[2s;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = All} {color:$getVar[color]}]
$setServerVar[filters;All]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==deep]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:-3;pitch:0.9;speed:1.1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
$songFilter[pitch:0.9;speed:1.1;bass:-3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Deep} {color:$getVar[color]}]
$setServerVar[filters;Deep]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==3d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.135;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 3D} {color:$getVar[color]}]
$setServerVar[filters;3D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:30;contrast:0;pulsator:0.08;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D} {color:$getVar[color]}]
$setServerVar[filters;8D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clarity]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Clarity} {color:$getVar[color]}]
$setServerVar[filters;Clarity]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==nightcore-normal]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore Normal} {color:$getVar[color]}]
$setServerVar[filters;Nightcore Normal]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==half]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:0.5;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Half} {color:$getVar[color]}]
$setServerVar[filters;Half]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==double]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:2;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Double} {color:$getVar[color]}]
$setServerVar[filters;Double]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==fan]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:25;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Fan} {color:$getVar[color]}]
$setServerVar[filters;Fan]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==purebass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:20;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Purebass} {color:$getVar[color]}]
$setServerVar[filters;Purebass]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==low]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Low} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.05;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Low]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==mid]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Mid} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.2;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Mid]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==high]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = High} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.07;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;High]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==delay]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Delay} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1000;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Delay]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d-v2]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D V2} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;echo:0.1;contrast:0;pulsator:0.15;vibrato:0;earwax:1]
$setServerVar[filters;8D V2]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vaporwave]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vaporwave} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0.875;speed:1;echo:0;contrast:0;pulsator:0;vibrato:0;earwax:0]
$setServerVar[filters;Vaporwave]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$else
There no filter \`$message\`.
$endif
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$cooldown[$commandInfo[filter;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]`
});

bot.command({
  name: "check",
  cooldown: "3s",
  code: `$title[Check]
$description[\`\`\`
Public       : $replaceText[$replaceText[$client[ispublic];true;✅];false;❌]
Pause        : $replaceText[$replaceText[$checkCondition[$getVar[pause]!=];true;✅];false;❌]
Resume       : $replaceText[$replaceText[$checkCondition[$getVar[resume]!=];true;✅];false;❌]
Skip         : $replaceText[$replaceText[$checkCondition[$getVar[skip]!=];true;✅];false;❌]
Stop         : $replaceText[$replaceText[$checkCondition[$getVar[stop]!=];true;✅];false;❌]
Shuffle      : $replaceText[$replaceText[$checkCondition[$getVar[shuffle]!=];true;✅];false;❌]
Clearqueue   : $replaceText[$replaceText[$checkCondition[$getVar[clearsong]!=];true;✅];false;❌]
Join         : $replaceText[$replaceText[$checkCondition[$getVar[join]!=];true;✅];false;❌]
Disconnect   : $replaceText[$replaceText[$checkCondition[$getVar[dc]!=];true;✅];false;❌]
Play         : $replaceText[$replaceText[$checkCondition[$getVar[errorjoin]!=];true;✅];false;❌]
ClientID     : $replaceText[$replaceText[$checkCondition[$getVar[clientidsoundcloud]!=];true;✅];false;❌]
UserID       : $replaceText[$replaceText[$checkCondition[$getServerVar[userid]!=default];true;✅];false;❌]
Log Music    : $replaceText[$replaceText[$checkContains[$getGlobalUserVar[logmusic];0;2];true;✅];false;❌]
React        : $replaceText[$replaceText[$checkContains[$getGlobalUserVar[controlreact];1];true;✅];false;❌]
Max Volume   : $getServerVar[maxvol]%
User Volume  : $getGlobalUserVar[vol]%
1) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[customemoji1]!=];true;✅];false;❌]
2) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[ytemoji]!=];true;✅];false;❌]
3) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[scemoji]!=];true;✅];false;❌]
Connect      : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;connect]==true];true;✅];false;❌]
Speak        : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;speak]==true];true;✅];false;❌]
Deafen       : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;deafenmembers]==true];true;✅];false;❌]
Reactions    : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;addreactions]==true];true;✅];false;❌]
Messages     : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;managemessages]==true];true;✅];false;❌]
Embed Links  : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;embedlinks]==true];true;✅];false;❌]
Attach Files : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;attachfiles]==true];true;✅];false;❌]
Move Members : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;movemembers]==true];true;✅];false;❌]
\`\`\`]
$color[$getVar[color]]
$footer[Color: $getVar[color]
Latency: $numberSeparator[$botPing]ms]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[check;cooldown];Please wait **%time%** before using again.]`
});

bot.command({
  name: "user-info",
  cooldown: "3s",
  code: `$author[$username[$findUser[$message;yes]]#$discriminator[$findUser[$message;yes]];$userAvatar[$findUser[$message;yes]]]
$addField[Command Used;\`$numberSeparator[$getGlobalUserVar[commanduserused;$findUser[$message;yes]];.]\`;yes]
$addField[Song Played;\`$numberSeparator[$getGlobalUserVar[userused;$findUser[$message;yes]];.]\`;yes]
$addField[Created At; \`$creationDate[$findUser[$message;yes];date]\`;yes]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[user-info;cooldown];Please wait **%time%** before using again.]
$onlyIf[$isBot[$findUser[$message;yes]]!=true;{description:\`❌ Oops.. looks like we cant collect data user.\`} {color:$getVar[color]}]`
});

bot.command({
  name: "seek",
  cooldown: "3s",
  code: `$if[$toLowercase[$message[2]]==save]
$addField[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$message[1];1000];10]!=];false;0 second];true;$humanizeMS[$multi[$message[1];1000];10]]\`;one-time use saving seek.]
$footer[Value: $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[saveseek;$message[1]]
$seekTo[$message[1]]
$onlyIf[$message[1]!=0;You cant.]
$else
$description[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$noMentionMessage;1000];10]!=];false;0 second];true;$humanizeMS[$multi[$noMentionMessage;1000];10]]\`]
$footer[Value: $noMentionMessage]
$color[$getVar[color]]
$wait[$sum[$multi[$botPing;1;2;3];$dbPing]]
$seekTo[$noMentionMessage]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[1];-]!=true;You cant seek negative.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[>1;Usage: \`seek (number)\`]
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[seek;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "join",
  aliases: ["j", "summon"],
  cooldown: "3s",
  code: `$joinVC[$replaceText[$replaceText[$checkCondition[$message!=];false;$voiceID];true;$findChannel[$message]]]
$if[$hasPerms[$clientID;movemembers]==true]
$moveUser[$authorID;$replaceText[$replaceText[$checkCondition[$message!=];false;$voiceID];true;$findChannel[$message]]]
$endif
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[✅]
$onlyBotPerms[addreactions;]
$else
$replaceText[$getVar[join];{join};$channelName[$replaceText[$replaceText[$checkCondition[$message!=];false;$voiceID];true;$findChannel[$message]]]]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$voiceID[$clientID]==;Already joined!]
$cooldown[$commandInfo[join;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "rejoin",
  aliases: ["reconnect"],
  cooldown: "3s",
  code: `$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$if[$voiceID[$clientID]==]
$joinVC[$voiceID]
$else
$joinVC[$voiceID]
$wait[$multi[$botPing;2]]
$leaveVC
$setServerVar[filters;none]
$endif
$cooldown[$commandInfo[rejoin;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
})

bot.command({
  name: "disconnect",
  aliases: ["dc", "bye", "leave"],
  cooldown: "3s",
  code: `$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$if[$hasPerms[$clientID;movemembers]==true]
$moveUser[$authorID]
$endif
$leaveVC
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[✔]
$onlyBotPerms[addreactions;]
$else
$getVar[dc]
$endif
$onlyIf[$voiceID[$clientID]!=;Already disconnected!]
$cooldown[$commandInfo[disconnect;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "move", 
  cooldown: "3s",
  code: `$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$moveUser[$authorID;$findChannel[$message]]
$moveUser[$clientID;$findChannel[$message]]
$addCmdReactions[✅]
$onlyIf[$findChannel[$message[1]]!=$voiceID;]
$onlyIf[$voiceID[$clientID]!=;<@$clientID> not on voice channel.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$argsCheck[>1;What channel do you want move bot and you]
$cooldown[$commandInfo[move;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[movemembers;**Move Members** Missing Permission - Bot]
$suppressErrors[something just happened.]`
})

bot.command({
  name: "pause",
  cooldown: "3s",
  code: `$pauseSong
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[pause]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏸]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[durationcache;$splitText[1]]
$textSplit[$songInfo[current_duration]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[pause;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "resume",
  cooldown: "3s",
  code: `$if[$getServerVar[durationcache]==0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[resume]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[▶]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[resume;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "loop",
  aliases: ["l", "loopsong", "loopmusic"],
  cooldown: "3s",
  code: `$if[$getGlobalUserVar[controlreact]==1]
$let[say goodbye;$loopSong]
$addCmdReactions[🔂]
$onlyBotPerms[addreactions;]
$else
$description[$replaceText[$replaceText[$checkCondition[$loopSong==true];true;Loop now **on**];false;Loop now **off**]]
$color[$getVar[color]]
$addTimestamp
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=queue;You currently active **queue loop.**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[loop;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});

bot.command({
  name: "qloop",
  aliases: ["ql", "loopqueue"],
  cooldown: "3s",
  code: `$if[$getGlobalUserVar[controlreact]==1]
$let[let you down;$loopQueue]
$addCmdReactions[🔁]
$onlyBotPerms[addreactions;]
$else
$description[$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Queue Loop now **on**];false;Queue Loop now **off**]]
$color[$getVar[color]]
$addTimestamp
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=song;You currently active **song loop.**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[qloop;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});

bot.command({
  name: "reboot",
  code: `$if[$message[1]==]
$description[) reboot --normal
> Reboot
) reboot --destroy
> Reboot Instantly Turn Off]
$color[$getVar[color]]
$addTimestamp
$elseIf[$toLowercase[$message[1]]==--normal]
$reboot[server.js]
$wait[40ms]
$addCmdReactions[✅]
$endelseif
$elseIf[$toLowercase[$message[1]]==--destroy]
$killClient
$wait[40ms]
$addCmdReactions[✅]
$endelseif
$endif
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]`
});

bot.command({
  name: "funcs",
  code: `$if[$noMentionMessage==$getGlobalUserVar[cachemessage]]
$author[$getGlobalUserVar[cachedescs]$getGlobalUserVar[cacheerrors]]
Usage: \`$getGlobalUserVar[cachefuncs]\`
$color[$getVar[color]]
$addTimestamp
$else
$setGlobalUserVar[cachemessage;$noMentionMessage]
$setGlobalUserVar[cacheerrors;$getObjectProperty[message]]
$setGlobalUserVar[cachedescs;$getObjectProperty[data[0].desc]]
$setGlobalUserVar[cachefuncs;$getObjectProperty[data[0].usage]]
$wait[1s]
$author[$getObjectProperty[data[0].desc]$getObjectProperty[message]]
Usage: \`$getObjectProperty[data[0].usage]\`
$createObject[$jsonRequest[https://api.leref.ga/functions/$message;;Functions \`$message\` not found.]]
$color[$getVar[color]]
$addTimestamp
$endif
$argsCheck[>1;Functions?]
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]`
});

bot.command({
  name: "pruning",
  cooldown: "3s",
  code: `$description[$replaceText[$replaceText[$checkCondition[$pruneMusic==true];true;Pruning now **on**];false;Pruning now **off**]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[pruning;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "shuffle",
  aliases: ["sf"],
  cooldown: "3s",
  code: `$if[$getGlobalUserVar[controlreact]==1]
$shuffleQueue
$addCmdReactions[🔀]
$onlyBotPerms[addreactions;]
$else
$editIn[2ms;{author:$getVar[shuffle]} {title:Queue} {color:$getVar[color]} {description:$queue[1;3;\`{number} - {title}\`]} {timestamp};{author:$getVar[shuffle]} {title:Queue} {color:$getVar[color]} {description:$queue[1;7;\`{number} - {title}\`]} {timestamp};{author:$getVar[shuffle]} {title:Queue} {color:$getVar[color]} {description:$queue[1;10;\`{number} - {title}\`]} {timestamp}]
$shuffleQueue
$title[Updating..]
$addTimestamp
$color[$getVar[color]]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[shuffle;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "shuffleskip",
  aliases: ["sfs"],
  cooldown: "3s",
  code: `$skipSong
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[🔀;⏭]
$onlyBotPerms[addreactions;]
$else
$author[$getVar[shuffle]]
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$endif
$shuffleQueue
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[shuffleskip;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "remove",
  aliases: ["r"],
  cooldown: "3s",
  code: `$moveSong[$sum[$message[1];1];]
$title[$replaceText[$getVar[remove];{d-amount};$replaceText[$message[1];-;]]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$message[1]<=$sub[$queueLength;1];Only have **$queueLength song**.]
$onlyIf[$message[1]>1;You cant remove at first song.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[remove;cooldown];Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`remove (numnber song on queue)\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "nowplaying",
  aliases: ["np"],
  cooldown: "3s",
  code: `$author[Now Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;yes]
$addField[Link;[Invite Bot]($replaceText[$getBotInvite;permissions=0;permissions=$getVar[permission]])
[Thumbnail]($songInfo[thumbnail])
$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;];false;[Download]($getServerVar[linkdownload])];yes]
$addField[Ping;\`$dbPingms\`;yes]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[URL;[Song]($songInfo[url] "$songInfo[title]");yes] 
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)];yes]
$addField[Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;LIVE];false;$filterMessage[$filterMessage[$splitText[9];(];)]]\`;yes]
$addField[Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;LIVE];false;$filterMessage[$filterMessage[$splitText[6];(];)]]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$textSplit[$songInfo[duration] $songInfo[current_duration] $songInfo[duration_left]; ]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[nowplaying;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "stop",
  cooldown: "3s",
  code: `$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$setServerVar[durationcache;0]
$stopSong
$if[$getGlobalUserVar[controlreact]==0]
$sendMessage[$getVar[stop];no]
$elseIf[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏹]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "skip",
  aliases: ["s"],
  cooldown: "3s",
  code: `$if[$message[1]==]
$skipSong
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseIf[$isNumber[$message[1]]==true]
$skipTo[$replaceText[$replaceText[$checkContains[$loopStatus;song];true;$sum[$message[1];1]];false;$message[1]]]
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$message[1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$message[1]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$message[1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$message[1]]; ]
$onlyIf[$checkContains[$message[1];-]!=true;You cant skip negative.]
$onlyIf[$message[1]!=0;You cant skip zero.]
$onlyIf[$message[1]<$queueLength;You only can skip **$sub[$queueLength;1] song**.]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$endelseif
$endif
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[skip;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "clearqueue",
  aliases: ["cq"],
  cooldown: "3s",
  code: `$awaitReaction[$authorID;15s;{title:Are you sure you wanna clear?} {footer:Song#COLON# $queueLength} {color:$getVar[color]};✅,❌;clearqueueyes,clearqueueno;Confirmation failed.;yes]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[$commandInfo[clearqueue;cooldown];Please wait **%time%** before using again.]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]`
});

bot.command({
  name: "top",
  cooldown: "3s",
  code: `$awaitMessages[$authorID;15s;$random[13000;50000];top;Confirmation failed.]
$description[Verification first]
$footer[Code: $random[13000;50000]]
$color[$getVar[color]]
$onlyIf[$globalUserLeaderboard[userused;asc]!=;Seems like, this leaderboard was empty..]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[$commandInfo[top;cooldown];Please wait **%time%** before using again.]
$onlyBotPerms[managemessages;Missing Permission, **Manage Messages** - Bot]`
})

bot.command({
  name: "queue",
  aliases: ["q"],
  cooldown: "3s",
  code: `$author[Queue;$getVar[customemoji1]]
$addField[Page $replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage] - $truncate[$sum[$divide[$queueLength;10];0.9]] ($abbreviate[$charCount[$queue[1;$queueLength;{number} - {title}]]]);$queue[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];10;\`{number} - {title}\`]]
$addField[Estimated Next Playing;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Next Requested By;<@$songInfo[userID;1]>;yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$addField[Total Duration;\`$replaceText[$formatDate[$filterMessage[$filterMessage[$multi[$sum[$splitText[4];$splitText[7]];1000];(];)];mm:ss];0:;00:]\`;yes]
$addField[Next Playing;[$songInfo[title;1] | $songInfo[publisher;1]]($songInfo[url;1]);yes]
$addField[Now Playing;[$songInfo[title] | $songInfo[publisher]]($songInfo[url]);yes]
$footer[$queueLength Song]
$thumbnail[$songInfo[thumbnail]]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];-]!=true;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]<=$truncate[$sum[$divide[$queueLength;10];0.9]];]
$onlyIf[$isNumber[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]]!=false;]
$onlyIf[$queueLength!=1;{author:Currently Playing:$getVar[customemoji1]} {title:$songInfo[title]} {url:$songInfo[url]} {footer:$songInfo[publisher]:$songInfo[thumbnail]} {field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]\`:yes} {field:Duration Left:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[6];(];)]==00:00:00];true;LIVE];false;$filterMessage[$filterMessage[$splitText[3];(];)]]]\`:yes} {thumbnail:$songInfo[thumbnail]} {color:$getVar[color]}]
$if[$queueLength==1]
$textSplit[$songInfo[duration_left] $songInfo[duration]; ]
$else
$textSplit[$songInfo[duration_left] $songInfo[duration] $songInfo[duration;1]; ]
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[queue;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist",
cooldown: "3s",
code: `$author[Playlist $username's;$getVar[customemoji1]]
$description[1) $getGlobalUserVar[1]
2) $getGlobalUserVar[2]
3) $getGlobalUserVar[3]
4) $getGlobalUserVar[4]
5) $getGlobalUserVar[5]
6) $getGlobalUserVar[6]
7) $getGlobalUserVar[7]
8) $getGlobalUserVar[8]
9) $getGlobalUserVar[9]
10) $getGlobalUserVar[10]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$queueLength==1];true;Playing];false;$replaceText[$replaceText[$checkCondition[$voiceID!=];true;Idle];false;none]]]
$addTimestamp
$color[$getVar[color]]
$thumbnail[$userAvatar[$authorID;512]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[playlist;cooldown];Please wait **%time%** before using again.]`
});

bot.command({
name: "playlist-add",
cooldown: "3s",
code: `$setGlobalUserVar[$message[1];$message[2]]
$title[Your song has added on $message[1]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[$message[1]]==];true;Add];false;Replace]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[2];https://youtu.be/;https://m.youtube.com/watch?v=;https://www.youtube.com/watch?v=;https://youtube.com/watch?v=;playlist?;https://soundcloud.com/]!=false;Failed.]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[playlist-add;cooldown];Please wait **%time%** before using again.]
$argsCheck[2;Usage: \`playlist-add (number playlist) (song)\`]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist-remove",
cooldown: "3s",
code: `$setGlobalUserVar[$message[1];]
$title[Your song has remove on $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[$message[1]]!=null;Already remove!]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[playlist-remove;cooldown];Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-remove (number playlist)\`]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist-play",
cooldown: "3s",
code: `$if[$queueLength<1]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSong[$getGlobalUserVar[$message[1]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no]]]
$joinVC[$voiceID]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$getGlobalUserVar[$message[1]]!=;Nothing song was added on playlist.]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[playlist-play;cooldown];Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-play (number playlist)\`]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "volume",
  aliases: ["v"],
  cooldown: "3s",
  code: `$volume[$message[1]]
$description[Change from \`$volume%\` to \`$message[1]%\` ($replaceText[$replaceText[$checkCondition[$cropText[$divide[$message[1];100];4]>=1];true;1];false;$cropText[$divide[$message[1];100];4]] dB)]
$footer[Max Volume: $getServerVar[maxvol]%]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$setGlobalUserVar[vol;$message[1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$message[1]<=$getServerVar[maxvol];Max volume $getServerVar[maxvol]%!]
$onlyIf[$charCount[$message[1]]<4;Failed.]
$onlyIf[$isNumber[$message[1]]==true;Must number!]
$argsCheck[1;{title:Volume can change 1 - $getServerVar[maxvol]} {footer:Volume#COLON# $volume%} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[volume;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "farm",
  description: "Work at a farm and get some money",
  usage: "$getserverVar[prefix]farm",
  code: `
Pog you farmed up $message pepper plants and earned \`$numberSeparator[$multi[$message;60];,]\`<:plant:909421404204699679>!
$setGlobalUserVar[plant;$sub[$getGlobalUserVar[plant];$multi[$message;1]]]
  $setGlobalUserVar[money;$sum[$getGlobalUserVar[money];$multi[$message;60]]]
  $globalcooldown[1m;Sorry the farm is closed for the next %time%]
$onlyIf[$getGlobalUserVar[money]<=1500000;You have reached max go buy some items because your balance can not be more than \`1,500,000\`]
$onlyIf[$getGlobalUserVar[plant]>=$message;You dont have enough plants]
$onlyIf[$message>=1;**SPECIFY AN AMOUNT**]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]
`
})
