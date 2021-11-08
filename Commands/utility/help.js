module.exports = [{
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
    code: `$interactionReply[;{title:<:economy:898404177955401759> Economy Commands} {description:role-shop-add ¦ add a role to add items to the shop
add-money ¦ add money.
leaderboard ¦ leader board.
blacklist-spawns ¦ black list spwans.
blacklist ¦ black list.
buy-chick ¦ buy a cute chicken.
buy ¦ buy some thing.
cf ¦ cf.
dep ¦ deposit money.
economy ¦ enable economy on and off.
add-money-role ¦ add a money role.
add-everyone ¦ add everyone.
spawns ¦ money.
pay ¦ pay some money.
remove-everyone ¦ remove every one.
shop-remove ¦ remomve something from the shop.
remove ¦ remove
reset-economy ¦ rest the economy.
roulette ¦ russian roulette.
bet-setup ¦ setup the betting system.
shop ¦ buy some stuff.
start-bal ¦ start-bal.
remove-money-role ¦ remove a money role.
with ¦ withdraw money.
unblacklist-user ¦ unblacklist a user.
wm ¦ wm.
work ¦ work for money.
 
}{color:RANDOM}{footer: Page 2/7};{actionRow:Previous Page,2,1,1,,false:Next Page,2,1,3,,false};;7]`},
                 {
    type: "awaitedCommand",
    name: "await3",
    code: `$interactionReply[;{title:<:music:896761748676280401> Music Commands} {description:play ¦ Play a song.
volume ¦ Change the songs volume.
queue ¦ Queue a song.
clearqueue ¦ Clear queue.
skip ¦ Skip a song.
stop ¦ Stop a song.
nowplaying
loop ¦ Loop a song
resume ¦ Resume to a song.
pause ¦ Pause a song.
 
}{color:RANDOM}{footer:Page 3/7};{actionRow:Previous page,2,1,2,,false:Next Page,2,1,4,,false};;7]`},{
    type: "awaitedCommand",
    name: "await4",
    code: `$interactionReply[;{title:<:fun:896761813251809280> Fun Commands} {description:guess ¦ Play guess the number.
quote ¦ Quote a message.
editsnipe ¦  ¦ Check edited messages.
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
$interactionReply[;{title:<:moderation:896761895388872747> Admin Only Commands} {description:ban ¦ Ban a user.
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
temprole ¦ Temporarily role a user.
prefix ¦ Change my prefix.
 
}
 {color:RANDOM}{footer: Page 6/7};{actionRow:Previous Page,2,1,5,,false:Next Page,2,1,7,,false};;7]
$onlyPerms[admin;<@!$authorID> {title:Admin only} {description:Only admins can see  these commands}]`
                 }, {
    type: "awaitedCommand",
    name: "await7",
    code: `
$interactionReply[;{title:Developer Only} {description:reboot ¦ reboot the bot
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
{color:RANDOM}{footer: Page 0/7};{actionRow:Previous Page 1,2,1,2,,true:Next Page,2,1,1,,false};;yes]`}]