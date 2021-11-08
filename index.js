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

  
const mongoose = require("mongoose");

mongoose.connect("mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    useFindAndModify: false
})

const Discord = require("discord.js");

const bot = new Aoijs.Bot({

    connectedBots: true, 
sharding: true,
shardAmount: 100,
    token: process.env.TOKEN, //make a secret named TOKEN and in value put ur token

    prefix:['$getservervar[prefix]','$getglobaluservar[up]'], //change the prefix in line 270
fetchInvites: true
    
})

const disbut = require('discord-buttons') 
disbut(bot.client)
//Allows to execute Command


const fetch = require('node-fetch');

bot.loadCommands(`./Commands/`)

bot.onMessage({
  guildOnly: false,

respondToBots:false// commands will work in dms. set "true" for commands to work in guilds only
});


bot.status({
  text: "$allMembersCount members and $serverCount servers ",
   status: "online",
  type: "WATCHING",
  time: 12
})

bot.status({
  text: "for badwords",
   status: "online",
  type: "WATCHING",
  time: 12
})

bot.status({
  text: "for >help",
   status: "online",
  type: "WATCHING",
  time: 12
})

bot.status({
  text: "music",
   status: "online",
  type: "lISTENING",
  time: 12
})

bot.status({
  text: "levels",
   status: "online",
  type: "WATCHING",
  time: 12
})

bot.status({
  text: "messages",
   status: "online",
  type: "WATCHING",
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

bot.botJoinCommand({
channel: "$systemChannelID",
code: ` 
$description[hi i am Evobot thank you for inviting me. my prefix is **>** and
my features are:
<:economy:898404177955401759> economy
<:music:896761748676280401> music
<:moderation:905787390302490624> moderation
<:leveling:896951309809365024> leveling
<:fun:896761813251809280> fun
`]})

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
$onlyif[$get[condition]==perform;]
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




bot.variables({
 userav: "0",
 //music 
  file: "server.js", //For reboot and stats//
  database: "./database/main/main_scheme_1.sql", //For stats//

  pause: "⏸️ Paused.",
  resume: "▶️ Resumed!",
  skip: "⏩ Skipped!",  //Available {song}//
  stop: "⏹ Stopped.",  
  remove: "Removed song on {d-amount}.", //Available {d-amount}//

  clearsong: "✅ Cleared queue. from **{amount} song** to **0**", //Available {amount}//
  shuffle: "Shuffle Queue.",
  errorjoin: "{title:❌ You're not in a voice channel.} {color:FFFF00}",
  errorqueue: "{title:❌ There no song was playing.} {color:FF0000}",

  join: "Joined Voice Channel to the {join}.", //Available {join}//
  dc: "Disconnected.",

  //Changing Other//
  clientidsoundcloud: "",
  color: "000000",
  permission: "2176183360",
  userid: "default",
  logmusic: "0",
  247: "0", //0 = off | 1 = on stay 2 minutes | 2 = stay 24/7//
  channelstatus: "895990877888053268", //Change to your channel id, to send message when the bot restart.// 
  vol: "50", //Default Volume//
  maxvol: "150", //Max Volume//
  last: "null",
  linkdownload: "",
  filters: "none",
  controlreact: "0",
  saveseek: "0",
  durationcache: "0",
  reactmessageid: "",
  nontrigger: "0", //for disable play message when react active//

  customemoji1: "https://cdn.discordapp.com/emojis/852434440668184615.png?size=4096",
  ytemoji: "https://cdn.discordapp.com/emojis/852432148207108110.png?size=4096",
  scemoji: "https://cdn.discordapp.com/emojis/852432173758676993.png?size=4096",
 
  userused: "0",
  commanduserused: "0",

  //For playlist//
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
    no: "❌",
    hint: "2",
guess: "0",
msg: "0",
    yes: "✅",
    join: "",
    up: ">",
    prefix: ">",
    wtitle: "",
  wmsg: "",
  wimg: "",
  wchannel: "",
  wdm: "disabled",
  autorole: "",
    imageauthor: 0,
imageresult: "",
imagelength: 0,
imagenumber: 0,
imagepage: 1,
bleft: "left|890706435955101747|false",
bright: "right|890706436278079499|false",
bno: "guilded_image_3833dadf524f7034bf|890299986695307374|false",
warn: "0",
mute: "",
levelling:"true",
  level_msg:"{user.mention}, you just levelled up to {level}!",
  level_channel:"",
  level_roles:"",
  level_order:"",
  exp:"0",
  level_card:"https://images-ext-2.discordapp.net/external/0Xv4kCUKHD1-XuITg1pfJKpexx0WNSDycImJsgMyMZg/%3Fwidth%3D473%26height%3D473/https/media.discordapp.net/attachments/901046126671691816/901047335671459881/Photo_1633692466619.jpg",
  level_msges:"",
  level_morder:"",
  req:"100",
  rank:"0",
  snipe_msg: "",
 snipe_author: "",
 snipe_channel: "",
 snipe_date: "",
msgEditorID: "undefined",
esnipeOldMsg: "undefined",
antilink: "false",
 giveawaychannelid: 0,
    giveawayguildid: 0,
    giveawayprize: "",
    giveawaydescription: "",
    giveawaytime: 0,
    giveawayparticipants: "",
    giveawayisfinished: "false",
    giveawayisgiveaway: "false",
    testid1: "",
    premium: "false",
    money:"0",//Wallet
  bank:"0",//Bank
  work_msges:"",//Possible work messages
  work_amounts:"",//Possible work amounts
  work_cd:"10m",//Cooldown for work
  symb:"<:economy:898404177955401759>",//Money symbol
  bs:"<:economy:898404177955401759>",//Bank symbol
  sb:"0",//Starting Bal
  sbd:"false",//Starting Claimed or no
  rs:"false",//Random spawns
  ra:"",//Spawn amounts
  rc:"",//Spawn blacklisted channels	
  e:"false",//Economy Enabled Or no
  bc:"1000000",//Maximum bank capacity
  cf:"0",//Cock fight chances
  c:"0",//Chicken count
  cc:"0",//Chicken Cost
  gc:"0",//Max gamble cost for RPS, Roulette and CF
  ru:"",//Blacklisted economy users
   afk_roles:"",//AFK needed roles
  r:"",//Reason for AFK
  time:"",//Time for AFK
  afk_pings:"0",//Pings count in AFK
  afk_mentions:"",//Mentions by which user in AFK
  //Bot Logs
  bl:"",//Bot Logs channel
   afk: "",
  EnglishOnly: "off",
  welcomeBg: "",
  welcomeChannel: "",
welcomeMsg: "",
verify: "on",
verifchannel: "900721610313584650",
verifrole: "900429109933535292",
cbw: "",
  ticketchannel: "",
    endstamp:"0",
prefix:"w",
hoster:"",
prize:"",
joined:"0",
joinedusers:"",
ended:"false",
      item:"heh",//Item names
     roles: "heh",
      names:"heh",//Role shop messages
      tmid:"a",
      tmc:"",
      tmm:"",
      tm:"",
      tc:"",
      to:"",
      t:"",
});




    
    
    
    
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



 
bot.command({
name: "pause",
code: `$pauseSong
**⏸️ Paused**
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "resume",
code: `$resumeSong
**▶️ Resumed**
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "loop",
code: `$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Loop now **on**];false;Loop now **off**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "nowplaying",
aliases: "np",
code: `$author[Now playing;https://cdn.discordapp.com/emojis/729630163750354955.gif?size=1024]
$title[$songInfo[title]]
$description[$addField[Duration;$songInfo[duration]]
$addField[URL;$songInfo[url]]]
$footer[$botPingms to load it.]
$thumbnail[$songInfo[thumbnail]]
$color[a09fff]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})
 
bot.command({
name: "stop",
code: `$stopSong
$sendMessage[⏹️ Stopped.;no]
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]
$deleteIn[5s]`
})
 
 
bot.command({
name: "skip",
code: `$skipSong
⏩ Skipped!
$onlyIf[$queueLength>1;Only have **$queueLength song**]
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]
$onlyIf[$voiceID!=;**⛔ You need to join the voice channel first**]`
})
 
 
bot.command({
name: "clearqueue",
code: `$clearSongQueue
$stopSong
$editIn[125ms;✅ Cleared queue. from **$queueLength song** to **0**] ⚠️ Clearing...
$onlyIf[$queueLength!=0;**⛔ Nothing song was playing**]`
})

bot.command({
name: "volume", 
code: `$volume[$message[1]]
$onlyIf[$message[1]<101;*⛔ Max volume 100%*]
$onlyIf[$charCount[$message[1]]<4;Failed.]
$onlyIf[$isNumber[$message[1]]==true;Must number!]
$onlyIf[$message[1]!=;*⛔ Volume can change 0 - 100*]
$editIn[1s;*✅ Changed to $message[1]%] **Changing..*
$onlyIf[$queueLength!=0;*⛔ Nothing song was playing*]
$onlyIf[$voiceID!=;*⛔ You need to join the voice channel first*]`
})

 
bot.command({
name: "queue",
code: `$queue[1;30]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})

bot.command({
 name: "play",
 aliases: ['p'],
 code: `
$color[RANDOM]
$thumbnail[$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;thumbnail]]
$title[*Song Added to Queue*
$description[*Succesfully added* [$songInfo[title]\\]($songInfo[url]) to the *Queue*
$addField[:stopwatch:| Duration:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;duration]__**]
$addField[:dvd: | Views:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;views]__**]
$addField[:coffee: | Author:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;uploader_name]__**]
$addField[:clock10: Uploaded:;**__$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;uploaded]__**]
$playSong[$message;1m;{title:Error}{description:*⛔ There was an error while making the request*}{color:RED}]
$onlyIf[$message!=;{title:Error}{description:*⛔ I need Song name to find a* \`song\`...}]
$onlyIf[$voiceID!=;*⛔ You are Not in a Voice channel! Join a voice channel*]
$cooldown[5s;Wait *%time%* to use this command again]`
})
